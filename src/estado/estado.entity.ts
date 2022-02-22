import {  Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Inventario } from '../inventario/inventario.entity';



@Entity()
export class Estado{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    color?: string;

    @Property()
    habilitado?: string;

    @OneToMany(() => Inventario, b => b.estado, { cascade: [Cascade.ALL] })
    inventarios = new Collection<Inventario>(this);

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