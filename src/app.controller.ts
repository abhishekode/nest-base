import { Controller, Get, Version } from '@nestjs/common';

@Controller()
export class AppController {
	@Version('1')
	@Get()
	getHello() {
		return 'Welcome to Expense-API. This is the home page.';
	}
}
