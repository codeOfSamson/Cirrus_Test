import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReviewDto {
@Field()
  @IsOptional()
  @IsString()
  reviewer?: string;

  @Field()
  @IsOptional()
  @IsString()
  reviewee?: string;

  @Field()
  @IsOptional()
  @IsEnum(['PENDING', 'COMPLETED'])
  status?: string;

  @Field()
  @IsOptional()
  @IsString()
  feedback?: string;
}
