import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
export const photoProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
