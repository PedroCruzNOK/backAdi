import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Tipo } from '../tipo/tipo.entity';
import { Estado } from '../estado/estado.entity';
import { Grupo } from '../grupo/grupo.entity';
import { Producto } from '../producto/producto.entity';
import { Bundle } from '../bundles/bundles.entity';



@Entity()
export class Inventario{

    @PrimaryKey({  type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    uuid! : string;

    @ManyToOne(() => Producto)
    producto: Producto;

    @Property()
    preciopersonalizado?: number;

    @Property()
    descripcion?: string;

    @Property()
    descuentoinventario?: string;

    @Property()
    stock?: number;

    @Property()
    poliza?: string;

    @ManyToOne(() => Grupo)
    grupo: Grupo;

    @ManyToOne(() => Estado)
    estado: Estado;

    @ManyToOne(() => Tipo)
    tipo: Tipo;

    @OneToMany(() => Bundle, b => b.inventario, { cascade: [Cascade.ALL] })
    productos = new Collection<Bundle>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () =>  new Date() })
    updatedAt = new Date();

    constructor(producto: Producto, preciopersonalizado:number, descripcion: string, descuentoinventario: string, stock: number, poliza: string, grupo: Grupo, estado:Estado, tipo:Tipo ) {
        this.producto=producto;
        this.preciopersonalizado=preciopersonalizado;
        this.descripcion=descripcion;
        this.descuentoinventario=descuentoinventario;
        this.stock=stock;
        this.poliza=poliza;
        this.grupo=grupo;
        this.estado=estado;
        this.tipo=tipo;
    
    }


}