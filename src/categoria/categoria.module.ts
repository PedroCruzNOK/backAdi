import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Module({
  imports : [ MikroOrmModule.forFeature([ Categoria ]) ],
  providers: [CategoriaService],
  controllers: [CategoriaController],
})
export class CategoriaModule {}
