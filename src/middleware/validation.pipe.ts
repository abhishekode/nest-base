import type { PipeTransform } from '@nestjs/common';
import { Injectable, BadRequestException } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(private readonly schema: Joi.ObjectSchema) {}

	transform(value: any) {
		const { error } = this.schema.validate(value, { abortEarly: false });

		if (error) {
			const errorMessage = this.formatErrorMessages(error);
			throw new BadRequestException(errorMessage);
		}

		return value;
	}

	private formatErrorMessages(error: Joi.ValidationError): string {
		return error.details[0].message.replace(/['"]/g, '');
	}
}
