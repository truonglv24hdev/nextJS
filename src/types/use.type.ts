import { IUser } from '../database/user.model';

export interface UserItemData extends Omit<IUser, ''> {}
export type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};