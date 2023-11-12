import { UseGuards } from '@nestjs/common';

import { AdminUserGuard } from '../guards/admin-user.guard';

export const AdministratorOnly = () => UseGuards(AdminUserGuard);
