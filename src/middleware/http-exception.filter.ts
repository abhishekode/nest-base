import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		response.status(status).json({
			status: false,
			statusCode: status,
			message: exception.message,
		});
	}
}
