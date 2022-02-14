import {  Entity, PrimaryKey, Property } from '@mikro-orm/core';


@Entity()
export class Grupo{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    color?: string;

    @Property()
    habilitado?: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(nombre: string, color: string, habilitado: string) {
        
        this.nombre = nombre;
        this.color = color;
        this.habilitado= habilitado;
    }


}