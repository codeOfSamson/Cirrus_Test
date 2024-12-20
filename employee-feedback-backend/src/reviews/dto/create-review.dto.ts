import { Field, InputType , Int} from '@nestjs/graphql';
import { IsEnum, Min, Max, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateReviewDto {
  @Field() 
  @IsNotEmpty()
  @IsString()
  reviewer: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  reviewee: string;

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
