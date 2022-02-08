import { Migration } from '@mikro-orm/migrations';

export class Migration20220208205215 extends Migration {

  async up(): Promise<void> {
    this.addSql('select 1');
  }

}
