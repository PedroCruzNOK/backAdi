import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { EstadoModule } from './estado/estado.module';
import { TipoModule } from './tipo/tipo.module';
import { GrupoModule } from './grupo/grupo.module';
import { InventarioModule } from './inventario/inventario.module';
import { BundlesModule } from './bundles/bundles.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      
    }),
    CategoriaModule,
    ProductoModule,
    EstadoModule,
    TipoModule,
    GrupoModule,
    InventarioModule,
    BundlesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
