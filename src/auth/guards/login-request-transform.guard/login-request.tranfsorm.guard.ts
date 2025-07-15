import { ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from 'src/auth/dtos/login.dto';

/**
 * Custom guard that ensures the login request body is:
 * - Properly transformed into class instances (e.g., email/password as strings)
 * - Type-safe before reaching the LocalStrategy
 *
 * This prevents issues like bcrypt errors when "password" is sent as a number.
 */

// By extending AuthGuard('local'), your guard wraps the standard Passport
// local authentication, ensuring this flow:
// LoginRequestTransformGuard => AuthGuard
export function LoginRequestTransformGuard() {
  @Injectable()
  class LoginTransformGuard extends AuthGuard('local') {
    override async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      // Step 1: Transform raw body into LoginDto instance
      const dto = plainToInstance(LoginDto, request.body);

      // Step 2: Force-convert to strings to avoid type issues (e.g., password: 123 → "123")
      request.body = {
        email: String(dto.email),
        password: String(dto.password),
      };

      // Step 3: Delegate to the default passport-local AuthGuard
      return super.canActivate(context) as Promise<boolean>;
    }
  }

  // Why use mixin()?
  // Preserves Decorators: Keeps @Injectable() working
  // DI Compatibility: Allows @UseGuards(LoginRequestTransformGuard())
  // Avoids Scope Issues: Prevents memory leaks

  return mixin(LoginTransformGuard);
}
