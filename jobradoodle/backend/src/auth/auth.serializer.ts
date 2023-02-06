import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './auth.model';

export default class SessionSerializer extends PassportSerializer {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: User, done: Function) {
    if (!payload) return done(null, null);
    const user = await this.repo.findOneBy({ id: payload.id });
    return user ? done(null, user) : done(null, null);
  }
}
