import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
