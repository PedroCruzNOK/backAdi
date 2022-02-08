import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Producto } from '../producto/producto.entity';

@Entity()
export class Categoria{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    descripcion?: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    @OneToMany(() => Producto, b => b.categoria, { cascade: [Cascade.ALL] })
    productos = new Collection<Producto>(this);

    constructor(nombre: string, descripcion: string) {
        
        this.nombre = nombre;
        this.descripcion = descripcion;
    }


}