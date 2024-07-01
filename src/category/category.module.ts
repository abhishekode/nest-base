import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.schema';
import { CloudinaryService } from 'src/utils/cloudinary';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
	],
	controllers: [CategoryController],
	providers: [CategoryService, CloudinaryService],
})
export class CategoryModule {}
