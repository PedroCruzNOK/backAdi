import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, LockMode, wrap } from '@mikro-orm/core';

@Controller('categoria')
export class CategoriaController {
    constructor (@InjectRepository(Categoria) private readonly categoriaRepository: EntityRepository<Categoria>, private readonly em:EntityManager){}

    @Get()
    async find(){
        
        const qb = this.em.createQueryBuilder(Categoria);
        qb.update({ nombre: 'Categoria de pedro '}).where({ uuid: "4408e3f9-13a8-4c08-88b7-68b54a1be38a" });
        console.log(qb.getQuery());
        console.log(qb.getParams());
        const res1 = await qb.execute();

        return await this.em.find(Categoria, {}, {
            populate: ['productos'], 
            strategy: LoadStrategy.JOINED,
            lockMode: LockMode.NONE,
            lockTableAliases: ['e0'],
            
        }); 
        
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
        const em = this.em.fork();
        await em.begin();  
    try {
        const categoria = new Categoria(body.nombre, body.descripcion);
        await this.categoriaRepository.persistAndFlush(categoria);
        return categoria;
        } 
    catch (e) {
        await em.rollback();
        throw e;
        }
    }
    
    
    @Put(':uuid')
    async update(@Param() uuid: string, @Body() body: any) {
        const categoria = await this.categoriaRepository.findOne(uuid);
        if (!categoria) {
        throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
        }
    const em = this.em.fork();
    await em.begin();  
    try {
        wrap(categoria).assign(body);
        await this.categoriaRepository.persistAndFlush(categoria);
        return categoria;
    } catch (e) {
        await em.rollback();
        throw e;
      }
    }
}