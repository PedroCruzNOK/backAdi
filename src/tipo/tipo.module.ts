import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TipoController } from './tipo.controller';
import { Tipo } from './tipo.entity';
import { TipoService } from './tipo.service';

@Module({
  imports : [ MikroOrmModule.forFeature([ Tipo ]) ],
  providers: [TipoService],
  controllers: [TipoController],
})
export class TipoModule {}
