import { Migration } from '@mikro-orm/migrations';

export class Migration20220214162126 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tipo" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "habilitado" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "tipo" add constraint "tipo_pkey" primary key ("uuid");');

    this.addSql('create table "grupo" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "color" varchar(255) null, "habilitado" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "grupo" add constraint "grupo_pkey" primary key ("uuid");');

    this.addSql('create table "estado" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "color" varchar(255) null, "habilitado" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "estado" add constraint "estado_pkey" primary key ("uuid");');
  }

}
