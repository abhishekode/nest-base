import * as Joi from 'joi';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CategoryDto {
	@ApiProperty()
	name: string;

	@ApiProperty({ type: 'string', format: 'binary' })
	featuredImage: Express.Multer.File;
}

export class UpdateCategoryDto extends PartialType(CategoryDto) {}

export const categoryJoiSchema = Joi.object({
	name: Joi.string().required(),
});
