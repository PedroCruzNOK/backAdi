import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { QueryOrder, wrap } from '@mikro-orm/core';

@Controller('categoria')
export class CategoriaController {

    constructor (@InjectRepository(Categoria) private readonly categoriaRepository: EntityRepository<Categoria>){}

    @Get()
    async find(){
        return await this.categoriaRepository.findAll(['productos'],{nombre: QueryOrder.DESC}, 20);
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const categoria = await this.categoriaRepository.findOne(uuid);

        if (!categoria) {
        throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
        }

        return categoria;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre || !body.descripcion) {
        throw new HttpException('No se pudo crear la categoria', HttpStatus.BAD_REQUEST);
        }
        
        const categoria = new Categoria(body.nombre, body.descripcion);
        await this.categoriaRepository.persistAndFlush(categoria);
    
        return categoria;
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const categoria = await this.categoriaRepository.findOne(uuid);

        if (!categoria) {
        throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
        }

        wrap(categoria).assign(body);
        await this.categoriaRepository.persistAndFlush(categoria);

        return categoria;
    }
}