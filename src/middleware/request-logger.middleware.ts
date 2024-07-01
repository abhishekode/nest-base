import type { NestMiddleware } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger();

	use(req: Request, res: Response, next: NextFunction) {
		res.on('finish', () => {
			const statusCode = res.statusCode;
			if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
				this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
			}
		});

		next();
	}
}
