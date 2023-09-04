import { DataSource } from 'typeorm';
import { User } from './user/user.model';
import { Message } from './discutions/model/message.model';
import { Discution } from './discutions/model/discution.model';

export let dataSource: DataSource;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'test-api',
        entities: [User, Message, Discution],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
