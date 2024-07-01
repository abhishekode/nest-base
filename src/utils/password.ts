/* eslint-disable no-useless-catch */
import * as bcrypt from 'bcrypt';

export const generateHashPassword = async (
	password: string
): Promise<string> => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		throw new Error(`Error hashing password: ${error}`);
	}
};

export const matchPassword = async (
	password: string,
	storedPassword: string
): Promise<boolean> => {
	try {
		const isPasswordMatch = await bcrypt.compare(password, storedPassword);
		return isPasswordMatch;
	} catch (error) {
		throw new Error(`Password comparison failed: ${error}`);
	}
};

export const generatePasswordResetToken = async (
	email: string,
	userId: string
): Promise<string> => {
	try {
		const combinedData = `${userId}${email}`;

		const token = await bcrypt.hash(combinedData, 10);
		return token;
	} catch (error) {
		throw error;
	}
};
