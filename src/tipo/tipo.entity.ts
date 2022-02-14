import {  Entity, PrimaryKey, Property } from '@mikro-orm/core';


@Entity()
export class Tipo{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    habilitado?: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(nombre: string, habilitado: string) {
        
        this.nombre = nombre;
        this.habilitado= habilitado;
    }


}