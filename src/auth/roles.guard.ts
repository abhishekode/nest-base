import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import type { UserRole } from 'src/constants/common.interface';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);

		if (!requiredRoles || requiredRoles.length === 0) {
			// No roles are required, so access is granted.
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user || !user.id) {
			// User is not authenticated, access denied.
			throw new UnauthorizedException('Authentication credentials missing.');
		}

		const userRoles = user.role || [];
		const hasRequiredRole = requiredRoles.some((role) =>
			userRoles.includes(role)
		);

		if (!hasRequiredRole) {
			// User does not have required roles.
			throw new UnauthorizedException('Insufficient permissions.');
		}

		return true;
	}
}
