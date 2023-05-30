import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    console.log('🚀 ~ file: get-current-user.decorator.ts:5 ~ data:', data);
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;

    return request.user[data];
  },
);
