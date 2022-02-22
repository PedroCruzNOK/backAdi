import { Migration } from '@mikro-orm/migrations';

export class Migration20220221162621 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tipo" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "habilitado" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "tipo" add constraint "tipo_pkey" primary key ("uuid");');

    this.addSql('create table "grupo" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "color" varchar(255) null, "habilitado" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "grupo" add constraint "grupo_pkey" primary key ("uuid");');

    this.addSql('create table "estado" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "color" varchar(255) null, "habilitado" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "estado" add constraint "estado_pkey" primary key ("uuid");');

    this.addSql('create table "categoria" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "descripcion" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "categoria" add constraint "categoria_pkey" primary key ("uuid");');

    this.addSql('create table "producto" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "descripcion" varchar(255) null, "imagen" varchar(255) null, "categoria_uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "producto" add constraint "producto_pkey" primary key ("uuid");');

    this.addSql('create table "inventario" ("uuid" uuid not null default uuid_generate_v4(), "producto_uuid" uuid not null, "preciopersonalizado" int null, "descripcion" varchar(255) null, "descuentoinventario" varchar(255) null, "stock" int null, "poliza" varchar(255) null, "grupo_uuid" uuid not null, "estado_uuid" uuid not null, "tipo_uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "inventario" add constraint "inventario_pkey" primary key ("uuid");');

    this.addSql('create table "bundle" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "descripcion" varchar(255) null, "metadescripcion" varchar(255) null, "inventario_uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "bundle" add constraint "bundle_pkey" primary key ("uuid");');

    this.addSql('alter table "producto" add constraint "producto_categoria_uuid_foreign" foreign key ("categoria_uuid") references "categoria" ("uuid") on update cascade;');

    this.addSql('alter table "inventario" add constraint "inventario_producto_uuid_foreign" foreign key ("producto_uuid") references "producto" ("uuid") on update cascade;');
    this.addSql('alter table "inventario" add constraint "inventario_grupo_uuid_foreign" foreign key ("grupo_uuid") references "grupo" ("uuid") on update cascade;');
    this.addSql('alter table "inventario" add constraint "inventario_estado_uuid_foreign" foreign key ("estado_uuid") references "estado" ("uuid") on update cascade;');
    this.addSql('alter table "inventario" add constraint "inventario_tipo_uuid_foreign" foreign key ("tipo_uuid") references "tipo" ("uuid") on update cascade;');

    this.addSql('alter table "bundle" add constraint "bundle_inventario_uuid_foreign" foreign key ("inventario_uuid") references "inventario" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "inventario" drop constraint "inventario_tipo_uuid_foreign";');

    this.addSql('alter table "inventario" drop constraint "inventario_grupo_uuid_foreign";');

    this.addSql('alter table "inventario" drop constraint "inventario_estado_uuid_foreign";');

    this.addSql('alter table "producto" drop constraint "producto_categoria_uuid_foreign";');

    this.addSql('alter table "inventario" drop constraint "inventario_producto_uuid_foreign";');

    this.addSql('alter table "bundle" drop constraint "bundle_inventario_uuid_foreign";');

    this.addSql('drop table if exists "tipo" cascade;');

    this.addSql('drop table if exists "grupo" cascade;');

    this.addSql('drop table if exists "estado" cascade;');

    this.addSql('drop table if exists "categoria" cascade;');

    this.addSql('drop table if exists "producto" cascade;');

    this.addSql('drop table if exists "inventario" cascade;');

    this.addSql('drop table if exists "bundle" cascade;');
  }

}
