import { SetMetadata } from '@nestjs/common';

/* Routes marked by this decorator will be excluded from auth guards */
export const PublicRoute = () => SetMetadata('public', true);
