import { dataSource } from '../database.provider';
import { User } from './user.model';
import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export class UserFactory extends Factory<User> {
  protected entity = User;
  protected dataSource = dataSource;
  protected attrs(): FactorizedAttrs<User> {
    return {
      username: faker.person.firstName(),
      email: faker.person.fullName() + '@email.com',
      password: randomUUID(),
    };
  }
}
