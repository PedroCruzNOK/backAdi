import { Entity, ManyToOne, PrimaryKey, Property, OneToMany, Collection, Cascade} from '@mikro-orm/core';
import { Inventario } from '../inventario/inventario.entity';
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

    @OneToMany(() => Inventario, b => b.producto, { cascade: [Cascade.ALL] })
    inventarios = new Collection<Inventario>(this);

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