import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Put,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
	CategoryDto,
	UpdateCategoryDto,
	categoryJoiSchema,
} from './dto/create-category.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/common.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import {
	ApiBearerAuth,
	ApiConsumes,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import {
	CategorySuccessResponse,
	CategorySuccessResponseList,
} from './dto/category.swagger';
import {
	BadRequestResponse,
	NotFoundResponse,
	SuccessResponse,
} from 'src/constants/common.swagger';
import { JoiValidationPipe } from 'src/middleware/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('category')
@ApiResponse({
	status: 404,
	description: 'Not Found',
	type: NotFoundResponse,
})
@ApiResponse({
	status: 400,
	description: 'Bad Request',
	type: BadRequestResponse,
})
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiResponse({ status: 200, type: CategorySuccessResponse })
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('categoryImage'))
	create(
		@Body() categoryDto: CategoryDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.categoryService.create(categoryDto, file);
	}

	@Get()
	@ApiResponse({ status: 200, type: CategorySuccessResponseList })
	findAll() {
		return this.categoryService.findAll();
	}

	@Get(':id')
	@ApiResponse({ status: 200, type: CategorySuccessResponse })
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(id);
	}

	@Put(':id')
	@ApiResponse({ status: 200, type: SuccessResponse })
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('categoryImage'))
	update(
		@Param('id') id: string,
		@Body(new JoiValidationPipe(categoryJoiSchema))
		updateCategoryDto: UpdateCategoryDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.categoryService.update(id, updateCategoryDto, file);
	}

	@Delete(':id')
	@ApiResponse({ status: 200, type: SuccessResponse })
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string) {
		return this.categoryService.remove(id);
	}
}
