import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GrupoController } from './grupo.controller';
import { Grupo } from './grupo.entity';
import { GrupoService } from './grupo.service';

@Module({
  imports : [ MikroOrmModule.forFeature([ Grupo]) ],
  providers: [GrupoService],
  controllers: [GrupoController],
})
export class GrupoModule {}
