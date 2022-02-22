import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { InventarioController } from './inventario.controller';
import { Inventario } from './inventario.entity';
import { InventarioService } from './inventario.service';

@Module({
  imports : [ MikroOrmModule.forFeature([ Inventario ]) ],
  providers: [InventarioService],
  controllers: [InventarioController],
})
export class InventarioModule {}
