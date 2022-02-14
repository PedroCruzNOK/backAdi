import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { EstadoModule } from './estado/estado.module';
import { TipoModule } from './tipo/tipo.module';
import { GrupoModule } from './grupo/grupo.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      
    }),
    CategoriaModule,
    ProductoModule,
    EstadoModule,
    TipoModule,
    GrupoModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
