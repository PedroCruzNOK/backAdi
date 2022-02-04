import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options ={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    dbName: 'dbAdi',
    entities: ['dist/**/.entity.js'],
    entitiesTs:  ['src/**/.entity.ts'],
    metadataProvider:TsMorphMetadataProvider,
    

};

export default config;