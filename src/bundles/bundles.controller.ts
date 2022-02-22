import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Bundle } from './bundles.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, wrap } from '@mikro-orm/core';

@Controller('bundle')
export class BundleController {
    constructor (@InjectRepository(Bundle) private readonly bundleRepository: EntityRepository<Bundle>, private readonly em:EntityManager){}

    @Get()
    async find(){
        return await this.em.find(Bundle,{}, {
            populate: ['inventario'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        });//this.bundleRepository.findAll(['inventario'],{nombre: QueryOrder.DESC}, 20);
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const bundle = await this.bundleRepository.findOne(uuid);
        if (!bundle) {
        throw new HttpException('Bundle no encontrado', HttpStatus.NOT_FOUND);
        }
        return bundle;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre  || !body.descripcion ||  !body.metadescripcion ) {
        throw new HttpException('No se pudo crear el Bundle', HttpStatus.BAD_REQUEST);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        const bundle = new Bundle(body.nombre, body.descripcion, body.metadescripcion, body.inventario);
        await this.bundleRepository.persistAndFlush(bundle);
        return bundle;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const bundle = await this.bundleRepository.findOne(uuid);
        if (!bundle) {
        throw new HttpException('Bundle no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(bundle).assign(body);
        await this.bundleRepository.persistAndFlush(bundle);
        return bundle;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    //@Delete(':uuid')
      //  delete(@Param('id') id: string) {
        //    return this.productsService.remove(+id);
        //}
}