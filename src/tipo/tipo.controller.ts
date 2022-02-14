import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Tipo } from './tipo.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { QueryOrder, wrap } from '@mikro-orm/core';

@Controller('tipo')
export class TipoController {

    constructor (@InjectRepository(Tipo) private readonly tipoRepository: EntityRepository<Tipo>){}

    @Get()
    async find(){
        return await this.tipoRepository.findAll([],{nombre: QueryOrder.DESC}, 20);
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
        
        const tipo = new Tipo(body.nombre, body.habilitado);
        await this.tipoRepository.persistAndFlush(tipo);
    
        return tipo;
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const tipo = await this.tipoRepository.findOne(uuid);

        if (!tipo) {
        throw new HttpException('Tipo de inventario no encontrado', HttpStatus.NOT_FOUND);
        }

        wrap(tipo).assign(body);
        await this.tipoRepository.persistAndFlush(tipo);

        return tipo;
    }
}