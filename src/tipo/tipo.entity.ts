import {  Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Inventario } from '../inventario/inventario.entity';


@Entity()
export class Tipo{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    habilitado?: string;

    @OneToMany(() => Inventario, b => b.tipo, { cascade: [Cascade.ALL] })
    inventarios = new Collection<Inventario>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(nombre: string, habilitado: string) {
        
        this.nombre = nombre;
        this.habilitado= habilitado;
    }


}