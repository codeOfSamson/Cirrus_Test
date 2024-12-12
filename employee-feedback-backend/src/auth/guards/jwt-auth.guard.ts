import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // Extract the HTTP request from the GraphQL context
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req; // Important for GraphQL to make `req` available
  }
}
