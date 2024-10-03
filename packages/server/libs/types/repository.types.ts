// Imports:
import { Entities } from '.';

export interface IUserRepository {
  findById(id: string): Promise<Entities.IUser | null>;
  findAll(): Promise<Entities.IUser[]>;
  create(
    user: Entities.IUser,
    check: 'credentials' | 'google'
  ): Promise<Entities.IUser | null>;
  update(id: string, user: Entities.IUser): Promise<Entities.IUser | null>;
  delete(id: string): Promise<boolean>;
}
