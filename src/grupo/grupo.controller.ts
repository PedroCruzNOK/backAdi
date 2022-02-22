import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Grupo } from './grupo.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, wrap } from '@mikro-orm/core';

@Controller('grupo')
export class GrupoController {
    constructor (@InjectRepository(Grupo) private readonly grupoRepository: EntityRepository<Grupo>, private readonly em:EntityManager){}
    @Get()
    async find(){
        return await this.em.find(Grupo, {}, {
            populate: ['inventarios'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        });//this.grupoRepository.findAll([],{nombre: QueryOrder.DESC}, 20);
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
    const em = this.em.fork();
    await em.begin();  
    try {
        const grupo = new Grupo(body.nombre, body.color, body.habilitado);
        await this.grupoRepository.persistAndFlush(grupo);
        return grupo;
    } catch (e) {
        await em.rollback();
        throw e;
    }
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const grupo = await this.grupoRepository.findOne(uuid);
        if (!grupo) {
        throw new HttpException('Grupo no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(grupo).assign(body);
        await this.grupoRepository.persistAndFlush(grupo);
        return grupo;
    } catch (e) {
        await em.rollback();
        throw e;
    }
}
}