import { BadRequestException } from '@nestjs/common';
import type { Types } from 'mongoose';
import mongoose from 'mongoose';
import type { UserRole } from 'src/constants/common.interface';

interface JwtTokenPayload {
	id: string;
	email: string;
	role: UserRole;
}
interface IResponseData {
	status: boolean;
	result?: any;
	message?: string;
}

export const sendResponse = (res: IResponseData): any => {
	const { status, result, message } = res;
	return {
		status: status,
		result: result,
		message: message,
	};
};

export const getPaginationOptions = (page: number, size: number) => {
	const defaultPage = 1;

	const normalizedPage = Math.max(defaultPage, page || defaultPage);
	const normalizedSize = size;

	const skip = (normalizedPage - 1) * normalizedSize;
	const limit = normalizedSize;

	return { skip, limit };
};

export const generateOtpAndExpiryTime = (): {
	otp: number;
	otpExpireTime: Date;
} => {
	// Generate new OTP
	const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
	const otpExpireTime = new Date(Date.now() + 3 * 60000); // OTP expiry time, 3 minutes from now

	return { otp, otpExpireTime };
};

export const generateTokenPayload = (user: {
	_id: string;
	email: string;
	role: UserRole;
}): JwtTokenPayload => {
	const payload = {
		id: user?._id.toString() || '',
		email: user.email,
		role: user.role,
	};
	return payload;
};

export const isValidObjectId = (id: string): boolean => {
	return mongoose.Types.ObjectId.isValid(id);
};

export const convertStringToObjectId = (id: string) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new BadRequestException('Invalid Id format.');
	}
	return new mongoose.Types.ObjectId(id);
};

export const convertObjectIdToString = (id: Types.ObjectId) => {
	return id.toString();
};
