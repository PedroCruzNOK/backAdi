import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Producto } from './producto.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, wrap, LockMode } from '@mikro-orm/core';

@Controller('producto')
export class ProductoController {

    constructor (@InjectRepository(Producto) private readonly productoRepository: EntityRepository<Producto>, private readonly em:EntityManager){}
    @Get()
    async find(){
        const p =  await this.em.find(Producto, {}, {
            populate: ['categoria'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        }); //this.productoRepository.findAll(['categoria'],{nombre: QueryOrder.DESC}, 20);
        return p;
        
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const producto = await this.productoRepository.findOne(uuid);
        if (!producto) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
        }
        return producto;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre || !body.descripcion || !body.imagen ||  !body.categoria) {
        throw new HttpException('No se pudo crear el producto', HttpStatus.BAD_REQUEST);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        const producto = new Producto(body.nombre,body.descripcion, body.imagen, body.categoria);
        await this.productoRepository.persistAndFlush(producto);
        return producto;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }

    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const producto = await this.productoRepository.findOne(uuid);
        if (!producto) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(producto).assign(body);
        await this.productoRepository.persistAndFlush(producto);
        return producto;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    
}