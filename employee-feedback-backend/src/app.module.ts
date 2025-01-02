import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { AuditLogModule } from './audit/audit-log.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }), 
      playground: true, 
    }),
    AuthModule,
    UsersModule,
    ReviewsModule,
    AuditLogModule
  ],
})
export class AppModule {}
