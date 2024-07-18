import { Property } from 'src/entities/property.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  // Don't put this here, Instead put in the env file
  url: 'postgresql://realEstateDB_owner:pftI5LHDq4Ki@ep-jolly-limit-a5uhx8o7.us-east-2.aws.neon.tech/realEstateDB?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
