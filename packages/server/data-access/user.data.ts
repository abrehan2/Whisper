// Imports:
import User from '../entities/user.entity';
import { Repositories, Entities } from '../libs/types';

export default class UserRepository implements Repositories.IUserRepository {
  private database: typeof User;
  constructor(database: typeof User) {
    this.database = database;
  }

  async findById(id: string): Promise<Entities.IUser | null> {
    return (await this.database.findById(id)) ?? null;
  }

  async findAll(): Promise<Entities.IUser[]> {
    return await this.database.find();
  }

  async create(
    user: Entities.IUser,
    check: 'credentials' | 'google'
  ): Promise<Entities.IUser | null> {
    console.log(user, check);

    return null;
  }
  async update(
    id: string,
    user: Entities.IUser
  ): Promise<Entities.IUser | null> {
    console.log(id, user);

    return null;
  }
  async delete(id: string): Promise<boolean> {
    const user = await this.database.findByIdAndDelete(id);
    return user !== null;
  }
}
