import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Grupo } from './grupo.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { QueryOrder, wrap } from '@mikro-orm/core';

@Controller('grupo')
export class GrupoController {

    constructor (@InjectRepository(Grupo) private readonly grupoRepository: EntityRepository<Grupo>){}

    @Get()
    async find(){
        return await this.grupoRepository.findAll([],{nombre: QueryOrder.DESC}, 20);
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const grupo = await this.grupoRepository.findOne(uuid);

        if (!grupo) {
        throw new HttpException('grupo de inventario no encontrada', HttpStatus.NOT_FOUND);
        }

        return grupo;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.nombre || !body.color || !body.habilitado) {
        throw new HttpException('No se pudo crear el grupo', HttpStatus.BAD_REQUEST);
        }
        
        const grupo = new Grupo(body.nombre, body.color, body.habilitado);
        await this.grupoRepository.persistAndFlush(grupo);
    
        return grupo;
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const grupo = await this.grupoRepository.findOne(uuid);

        if (!grupo) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
        }

        wrap(grupo).assign(body);
        await this.grupoRepository.persistAndFlush(grupo);

        return grupo;
    }
}