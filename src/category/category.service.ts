import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import type { CategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { ICategory } from './category.schema';
import { CloudinaryService } from 'src/utils/cloudinary';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel('Category')
		private readonly categoryModel: Model<ICategory>,
		private cloudinaryService: CloudinaryService
	) {}

	private sendResponse(data: any, message: string) {
		return {
			status: true,
			message,
			result: data,
		};
	}

	private async getCategoryById(id: string) {
		const category = await this.categoryModel.findById(id);
		if (!category) {
			throw new NotFoundException(`Cannot find category ${id}`);
		}
		return category;
	}

	async create(createCategoryDto: CategoryDto, file: Express.Multer.File) {
		const { name } = createCategoryDto;

		if (!name) {
			throw new NotFoundException(`Cannot find category name`);
		}

		const categoryExists = await this.categoryModel.findOne({ name });

		if (categoryExists) {
			throw new BadRequestException('Category already exists');
		}
		let categoryImage = '';
		if (file?.originalname) {
			const images = await this.cloudinaryService.uploadImage(file, 'category');
			categoryImage = images.url;
		}
		const newCategory = new this.categoryModel({
			...createCategoryDto,
			categoryImage,
		});
		const categoryDetail = await newCategory.save();
		return this.sendResponse(
			categoryDetail,
			'New category created successfully'
		);
	}

	async findAll() {
		const categories = await this.categoryModel.find();
		return this.sendResponse(categories, 'Categories fetched successfully');
	}

	async findOne(id: string) {
		const category = await this.getCategoryById(id);
		return this.sendResponse(category, 'Category fetched successfully');
	}

	async update(
		id: string,
		updateCategoryDto: UpdateCategoryDto,
		file: Express.Multer.File
	) {
		const { name } = updateCategoryDto;
		const category = await this.getCategoryById(id);

		if (file?.originalname) {
			if (category.categoryImage) {
				await this.cloudinaryService.deleteImageByUrl(category.categoryImage);
			}
			const images = await this.cloudinaryService.uploadImage(file, 'category');
			category.categoryImage = images.url;
		}

		category.name = name;
		await category.save();

		return this.sendResponse(null, 'Category updated successfully');
	}

	async remove(id: string) {
		const category = await this.getCategoryById(id);

		if (category.categoryImage) {
			await this.cloudinaryService.deleteImageByUrl(category.categoryImage);
		}

		await this.categoryModel.findByIdAndDelete(id);
		return this.sendResponse(null, 'Category deleted successfully');
	}
}
