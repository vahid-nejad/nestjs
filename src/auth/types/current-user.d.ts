import { Role } from '../enums/role.enum';

export type CurrentUser = {
  id: number;
  role: Role;
};
