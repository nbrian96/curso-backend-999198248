import { UserRole } from './auth';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
