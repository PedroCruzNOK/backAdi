import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,

    }),
    MikroOrmModule.forRoot({
      
    }),
    CategoriaModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
