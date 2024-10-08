// Imports:
import { Entities } from '.';

export interface IUserRepository {
  findById(_id: string): Promise<Entities.IUser | null>;
  findAll(): Promise<Entities.IUser[]>;
  findOne(_email: string): Promise<Entities.IUser | null>;
  create(
    _user: Entities.IUser,
    _check: 'credentials' | 'google'
  ): Promise<boolean>;
  update(_id: string, _user: Entities.IUser): Promise<Entities.IUser | null>;
  delete(_id: string): Promise<boolean>;
}
