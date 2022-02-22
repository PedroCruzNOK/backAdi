import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Tipo } from './tipo.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, wrap } from '@mikro-orm/core';

@Controller('tipo')
export class TipoController {

    constructor (@InjectRepository(Tipo) private readonly tipoRepository: EntityRepository<Tipo>, private readonly em:EntityManager){}

    @Get()
    async find(){
        return await this.em.find(Tipo, {}, {
            populate: ['inventarios'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        });//this.tipoRepository.findAll([],{nombre: QueryOrder.DESC}, 20);
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const tipo = await this.tipoRepository.findOne(uuid);

        if (!tipo) {
        throw new HttpException('Tipo no encontrada', HttpStatus.NOT_FOUND);
        }
        return tipo;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre || !body.habilitado) {
        throw new HttpException('No se pudo crear el tipo de inventario', HttpStatus.BAD_REQUEST);
        }
    const em = this.em.fork();
    await em.begin();  
    try {    
        const tipo = new Tipo(body.nombre, body.habilitado);
        await this.tipoRepository.persistAndFlush(tipo);
        return tipo;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const tipo = await this.tipoRepository.findOne(uuid);
        if (!tipo) {
        throw new HttpException('Tipo de inventario no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(tipo).assign(body);
        await this.tipoRepository.persistAndFlush(tipo);
        return tipo;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
}