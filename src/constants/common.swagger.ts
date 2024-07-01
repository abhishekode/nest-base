import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
	@ApiProperty({ example: 'true' })
	status: boolean;
	@ApiProperty()
	message?: string;
}

export class SuccessResultResponse {
	@ApiProperty()
	_id: string;

	@ApiProperty()
	__v: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class ErrorResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty()
	statusCode: number;
	@ApiProperty()
	message: string;
}

export class NotFoundResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty({
		example: 404,
	})
	statusCode: number;
	@ApiProperty()
	message: string;
}

export class BadRequestResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty({
		example: 400,
	})
	statusCode: number;
	@ApiProperty()
	message: string;
}

export class ForbiddenResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty({
		example: 403,
	})
	statusCode: number;
	@ApiProperty()
	message: string;
}

export class UnauthorizedResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty({
		example: 401,
	})
	statusCode: number;
	@ApiProperty()
	message: string;
}

export class ConflictResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty({
		example: 409,
	})
	statusCode: number;
	@ApiProperty()
	message: string;
}

export class InternalServerErrorResponse {
	@ApiProperty({
		example: 'false',
	})
	status: boolean;
	@ApiProperty({
		example: 400,
	})
	statusCode: number;
	@ApiProperty()
	message: string;
}
