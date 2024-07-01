import { ForbiddenException, Injectable } from '@nestjs/common';
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
	constructor() {
		v2.config({
			cloud_name: '',
			api_key: '',
			api_secret: '',
		});
	}

	async uploadImage(
		filename: Express.Multer.File,
		folderName: string
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		// Check if the size of the file is more than 1M
		if (filename.size > 1000000) {
			throw new ForbiddenException(
				'Please upload a file size not more than 1M'
			);
		}

		// Check if the file is an image
		if (!filename.mimetype.startsWith('image')) {
			throw new ForbiddenException(
				'Sorry, this file is not an image, please try again'
			);
		}

		const imageAsBase64 = filename.buffer.toString('base64');
		const dataURI = `data:text/plain;base64,${imageAsBase64}`;

		const result = await v2.uploader.upload(dataURI, {
			folder: folderName,
			overwrite: true,
			quality: 'auto',
			crop: 'auto',
			gravity: 'auto',
			width: 500,
			height: 500,
		});

		return result;
	}

	async deleteImageByUrl(secureUrl: string): Promise<void> {
		const publicId = this.extractPublicIdFromSecureUrl(secureUrl);

		// Delete the photo using the public ID
		const result = await v2.uploader.destroy(publicId);
		return result;
	}

	private extractPublicIdFromSecureUrl(secureUrl: string): string {
		const parts = secureUrl.split('/');
		const publicId = parts[parts.indexOf('upload') + 1];

		return publicId;
	}
}
