import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core'
import { EntityRepository} from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria) private readonly categoriaRepo : EntityRepository<Categoria>,
        private readonly orm : MikroORM
    ){
    }

    async getAll() : Promise<Categoria[]> {
        return await this.categoriaRepo.find({},{
            fields : [
                
            ]
        } );
    }
}
