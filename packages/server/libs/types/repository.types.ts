// Imports:
import { Entities } from '.';

export interface IUserRepository {
  findById(_id: string): Promise<Entities.IUser | undefined>;
  findAll(): Promise<Entities.IUser[]>;
  findOne(_data: object): Promise<Entities.IUser | undefined>;
  create(
    _user: Entities.IUser,
    _check: 'credentials' | 'google'
  ): Promise<boolean | Partial<Entities.IUser>>;
  update(
    _id: string,
    _user: Entities.IUser
  ): Promise<Entities.IUser | undefined>;
  delete(_id: string): Promise<boolean>;
}
