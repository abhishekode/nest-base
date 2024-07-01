import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Welcome to Expense-API. This is the home page."', () => {
			expect(appController.getHello()).toBe(
				'Welcome to Expense-API. This is the home page.'
			);
		});
	});
});
