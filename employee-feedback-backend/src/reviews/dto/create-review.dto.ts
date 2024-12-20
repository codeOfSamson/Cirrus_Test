import { Field, InputType , Int, ID} from '@nestjs/graphql';
import { IsEnum, Min, Max, IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';

@InputType()
export class CreateReviewDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId() // Ensure the value is a valid MongoDB ObjectId
  reviewer: string; // This will be the ObjectId of the reviewer (User)

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId() // Ensure the value is a valid MongoDB ObjectId
  reviewee: string; // This will be the ObjectId of the reviewee (User)


  @Field({ nullable: true }) // Optional field
  @IsOptional()
  @IsEnum(['PENDING', 'COMPLETED'])
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  feedback?: string;

  @Field(() => Int)
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot exceed 5' })
  rating?: Number;
}
