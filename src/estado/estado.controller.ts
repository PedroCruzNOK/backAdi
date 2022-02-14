import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Estado } from './estado.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { QueryOrder, wrap } from '@mikro-orm/core';

@Controller('estado')
export class EstadoController {

    constructor (@InjectRepository(Estado) private readonly estadoRepository: EntityRepository<Estado>){}

    @Get()
    async find(){
        return await this.estadoRepository.findAll([],{nombre: QueryOrder.DESC}, 20);
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const estado = await this.estadoRepository.findOne(uuid);

        if (!estado) {
        throw new HttpException('Estado no encontrada', HttpStatus.NOT_FOUND);
        }

        return estado;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre || !body.color || !body.habilitado) {
        throw new HttpException('No se pudo crear el estado', HttpStatus.BAD_REQUEST);
        }
        
        const estado = new Estado(body.nombre, body.color, body.habilitado);
        await this.estadoRepository.persistAndFlush(estado);
    
        return estado;
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const estado = await this.estadoRepository.findOne(uuid);

        if (!estado) {
        throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
        }

        wrap(estado).assign(body);
        await this.estadoRepository.persistAndFlush(estado);

        return estado;
    }
}