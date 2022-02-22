import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Inventario } from '../inventario/inventario.entity';


@Entity()
export class Bundle{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @Property()
    nombre?: string;

    @Property()
    descripcion?: string;

    @Property()
    metadescripcion?: string;

    @ManyToOne(() => Inventario)
    inventario: Inventario;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();


    constructor(nombre: string, descripcion: string, metadescripcion:string, inventario:Inventario) {
        
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.metadescripcion= metadescripcion;
        this.inventario=inventario;
    }


}