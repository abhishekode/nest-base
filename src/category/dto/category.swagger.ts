import { ApiProperty } from '@nestjs/swagger';
import {
	SuccessResponse,
	SuccessResultResponse,
} from 'src/constants/common.swagger';

export class ICategoryResponse extends SuccessResultResponse {
	@ApiProperty()
	name: string;

	@ApiProperty()
	categoryImage: string;
}

export class CategorySuccessResponse extends SuccessResponse {
	@ApiProperty({ type: ICategoryResponse })
	result?: ICategoryResponse;
}

export class CategorySuccessResponseList extends SuccessResponse {
	@ApiProperty({ type: [ICategoryResponse] })
	result?: ICategoryResponse[];
}
