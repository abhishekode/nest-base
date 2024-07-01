export const jwtConstants = {
	secret: process.env.JWT_SECRET || 'secret',
	expiresIn: process.env.JWT_EXPIRES_IN || '30d',
};
