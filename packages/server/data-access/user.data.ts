// Imports:
import User from '../entities/user.entity';
import { AUTH_MODES } from '../libs/enums/modes.enum';
import { Repositories, Entities } from '../libs/types';

export default class UserRepository implements Repositories.IUserRepository {
  private database: typeof User;
  constructor(database: typeof User) {
    this.database = database;
  }

  async findById(id: string): Promise<Entities.IUser | undefined> {
    return (await this.database.findById(id).select('+password')) ?? undefined;
  }

  async findOne(data: object): Promise<Entities.IUser | undefined> {
    return (
      (await this.database.findOne({ ...data }).select('+password')) ??
      undefined
    );
  }

  async findAll(): Promise<Entities.IUser[]> {
    return await this.database.find();
  }

  async create(
    user: Partial<Entities.IUser>,
    check: 'credentials' | 'google'
  ): Promise<boolean | Partial<Entities.IUser>> {
    let createdUser: Partial<Entities.IUser> | null = null;

    // TODO: FOR USER SIGNING UP USING GOOGLE, THEY MUST CHOOSE THEIR COUNTRY AFTER SIGNING UP
    if (AUTH_MODES['GOOGLE'] === check) {
      createdUser = await this.database.create({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        googleId: user.googleId,
      });

      return createdUser;
    }

    createdUser = await this.database.create({
      name: user.name,
      email: user.email,
      password: user.password,
      country: user.country,
      avatar: user.avatar,
    });

    return !!createdUser;
  }
  async update(
    id: string,
    user: Entities.IUser
  ): Promise<Entities.IUser | undefined> {
    console.log(id, user);
    return undefined;
  }
  async delete(id: string): Promise<boolean> {
    const user = await this.database.findByIdAndDelete(id);
    return user !== null;
  }
}
