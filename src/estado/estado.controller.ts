import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Estado } from './estado.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, wrap } from '@mikro-orm/core';

@Controller('estado')
export class EstadoController {

    constructor (@InjectRepository(Estado) private readonly estadoRepository: EntityRepository<Estado>, private readonly em:EntityManager){}

    @Get()
    async find(){

        const qb = this.em.createQueryBuilder(Estado);
        qb.update({ nombre: 'Pedro estado Knex' }).where({ uuid: "8f84c5ea-d510-4c0d-89b1-69a31f185524" });
        const knex = qb.getKnexQuery();

        return await this.em.find(Estado, {}, {
            populate: ['inventarios'],
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
        });//this.estadoRepository.findAll([],{nombre: QueryOrder.DESC}, 20);
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
    const em = this.em.fork();
    await em.begin();  
    try {
        const estado = new Estado(body.nombre, body.color, body.habilitado);
        await this.estadoRepository.persistAndFlush(estado);
        return estado;
    } catch (e) {
        await em.rollback();
        throw e;
      }
    
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const estado = await this.estadoRepository.findOne(uuid);
        if (!estado) {
        throw new HttpException('Estado no encontrado', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(estado).assign(body);
        await this.estadoRepository.persistAndFlush(estado);
        return estado;
    } catch (e) {
        await em.rollback();
        throw e;
      }
    }
}