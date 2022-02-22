import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Inventario } from './inventario.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { wrap, LoadStrategy, LockMode } from '@mikro-orm/core';

@Controller('inventario')
export class InventarioController {

    constructor (@InjectRepository(Inventario) private readonly inventarioRepository: EntityRepository<Inventario>,private readonly em:EntityManager){

    }

    @Get()
    async find(){
        const inventario = await this.em.find(Inventario, {}, 
            {
                populate: ['grupo','tipo','estado'],
                strategy: LoadStrategy.JOINED,
                lockMode: LockMode.NONE,
                lockTableAliases: ['e0'],
            
            }); //this.inventarioRepository.findAll(['producto', 'estado', 'tipo'],{preciopersonalizado: QueryOrder.DESC}, 20);
        return inventario;
    }

    @Get(':uuid')
    async findOne(@Param() uuid: string) {
        const inventario = await this.inventarioRepository.findOne(uuid);

        if (!inventario) {
        throw new HttpException('inventario no encontrado', HttpStatus.NOT_FOUND);
        }

        return inventario;
    }

    @Post()
    async create(@Body() body: any) {
        if (!body.producto || !body.preciopersonalizado || !body.descripcion ||  !body.descuentoinventario || !body.stock ||  !body.poliza) {
        throw new HttpException('No se pudo crear el inventario', HttpStatus.BAD_REQUEST);
        }
        
        const inventario = new Inventario(body.producto, body.preciopersonalizado, body.descripcion, body.descuentoinventario, body.stock, body.poliza, body.grupo, body.estado, body.tipo);
        await this.inventarioRepository.persistAndFlush(inventario);
    
        return inventario;
    }

    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const inventario = await this.inventarioRepository.findOne(uuid);

        if (!inventario) {
        throw new HttpException('Inventario no encontrado', HttpStatus.NOT_FOUND);
        }

        wrap(inventario).assign(body);
        await this.inventarioRepository.persistAndFlush(inventario);

        return inventario;
    }
    
}