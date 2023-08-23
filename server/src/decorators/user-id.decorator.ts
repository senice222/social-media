import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId =
    createParamDecorator((_: unknown, ctx: ExecutionContext): string | null => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?._id ? request.user._id : null;
    },
);