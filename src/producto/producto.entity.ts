import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Categoria } from '../categoria/categoria.entity';

@Entity()
export class Producto{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    descripcion?: string;

    @Property()
    imagen?: string;

    @ManyToOne(() => Categoria)
    categoria: Categoria;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(nombre: string, descripcion: string, imagen: string, categoria: Categoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.categoria = categoria;
    }


}