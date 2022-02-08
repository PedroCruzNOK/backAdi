import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Module({
  imports : [ MikroOrmModule.forFeature([ Producto ]) ],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
