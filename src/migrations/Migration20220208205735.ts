import { Migration } from '@mikro-orm/migrations';

export class Migration20220208205735 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categoria" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "descripcion" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "categoria" add constraint "categoria_pkey" primary key ("uuid");');

    this.addSql('create table "producto" ("uuid" uuid not null default uuid_generate_v4(), "nombre" varchar(255) null, "descripcion" varchar(255) null, "imagen" varchar(255) null, "categoria_uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "producto" add constraint "producto_pkey" primary key ("uuid");');

    this.addSql('alter table "producto" add constraint "producto_categoria_uuid_foreign" foreign key ("categoria_uuid") references "categoria" ("uuid") on update cascade;');
  }

}
