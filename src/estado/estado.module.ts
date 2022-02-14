import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';
import { Estado } from './estado.entity';
import { EstadoService } from './estado.service';

@Module({
  imports : [ MikroOrmModule.forFeature([ Estado]) ],
  providers: [EstadoService],
  controllers: [EstadoController],
})
export class EstadoModule {}
