import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/employee-review-system'), // Correct URI for local MongoDB
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, 
    }),
    UsersModule,
    ReviewsModule,
  ],
})
export class AppModule {}
