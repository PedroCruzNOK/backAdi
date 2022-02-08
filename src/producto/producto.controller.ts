import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Producto } from './producto.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { QueryOrder, wrap } from '@mikro-orm/core';

@Controller('producto')
export class ProductoController {

    constructor (@InjectRepository(Producto) private readonly productoRepository: EntityRepository<Producto>){}

    @Get()
    async find(){
        return await this.productoRepository.findAll(['categoria'],{nombre: QueryOrder.DESC}, 20);
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
        
        const producto = new Producto(body.nombre,body.descripcion, body.imagen, body.categoria);
        await this.productoRepository.persistAndFlush(producto);
    
        return producto;
    }
    
}