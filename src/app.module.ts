import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      
    }),
    CategoriaModule,
    ProductoModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
