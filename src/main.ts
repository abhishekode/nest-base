import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './middleware/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	// Create Winston logger with console and file transports
	const logger = WinstonModule.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.timestamp(),
					winston.format.printf(({ timestamp, level, message }) => {
						return `${timestamp} [${level}]: ${message}`;
					})
				),
			}),
			new winston.transports.File({
				filename: 'app-error.log',
				level: 'error',
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.json()
				),
			}),
		],
	});

	const app = await NestFactory.create(AppModule, { logger });

	// Use global filters for handling HTTP exceptions
	app.useGlobalFilters(new HttpExceptionFilter());

	// Use ValidationPipe globally with options
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, // Automatically transform payloads to DTO classes
			whitelist: true, // Strips out properties that are not in the DTO
			forbidNonWhitelisted: true, // Throws an error if properties not in the DTO are provided
		})
	);

	// Set up security headers with Helmet
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'", "'unsafe-inline'"],
					styleSrc: ["'self'", "'unsafe-inline'"],
					imgSrc: ["'self'", 'data:', 'https:'],
					connectSrc: ["'self'"],
					fontSrc: ["'self'", 'https:', 'data:'],
					objectSrc: ["'none'"],
					frameAncestors: ["'none'"],
					upgradeInsecureRequests: [],
				},
			},
			crossOriginEmbedderPolicy: false,
			crossOriginOpenerPolicy: { policy: 'same-origin' },
			crossOriginResourcePolicy: { policy: 'same-origin' },
			frameguard: { action: 'deny' },
			hsts: true,
			ieNoOpen: true,
			noSniff: true,
			xssFilter: true,
		})
	);

	// Integrate Morgan with Winston for logging HTTP requests
	app.use(
		morgan('tiny', {
			stream: {
				write: (message) => logger.log('info', message.trim()),
			},
		})
	);

	// Enable Cross-Origin Resource Sharing with specific options
	app.enableCors({
		origin: ['http://localhost:4200', 'https://example.com'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});

	// Set global prefix for all routes
	app.setGlobalPrefix('api');

	// Enable API versioning using URI versioning
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	// Set request body size limits
	app.use(bodyParser.json({ limit: '10mb' }));
	app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

	// Set up Swagger documentation
	const config = new DocumentBuilder()
		.setTitle('Blog API Documentation')
		.setDescription(
			'This API documentation outlines endpoints and functionality for managing blog data. Explore endpoints for retrieving, adding, and updating data efficiently.'
		)
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger-doc', app, document);

	// Graceful shutdown handling
	const server = await app.listen(process.env.PORT || 3000);
	server.on('close', () => {
		logger.log('Server is shutting down gracefully.');
	});

	logger.log(
		`Server is listening on http://localhost:${process.env.PORT || 3000} 🚀`
	);
}

bootstrap();
