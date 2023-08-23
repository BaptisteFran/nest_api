import { DataSource } from 'typeorm';
import { User } from './user/user.model';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'test-api',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
