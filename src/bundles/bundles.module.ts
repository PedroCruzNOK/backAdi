import { Module } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { BundleController } from './bundles.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Bundle } from './bundles.entity';

@Module({
  imports : [ MikroOrmModule.forFeature([ Bundle ]) ],
  providers: [BundlesService],
  controllers: [BundleController],
})
export class BundlesModule {}
