import type { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { CategoryModule } from './category/category.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(process.env.DATABASE_URL),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST,
				port: 587,
				secure: false,
				auth: {
					user: process.env.EMAIL,
					pass: process.env.EMAIL_PASSWORD,
				},
			},
		}),
		CategoryModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {
	// let's add a middleware on all routes
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes('*');
	}
}
