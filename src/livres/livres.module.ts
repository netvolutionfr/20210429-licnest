import { Module } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {LivreSchema} from "./livres.model";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Livre', schema: LivreSchema}])],
  providers: [LivresService],
  controllers: [LivresController]
})
export class LivresModule {}
