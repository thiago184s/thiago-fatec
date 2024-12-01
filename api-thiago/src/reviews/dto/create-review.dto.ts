import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Nota é obrigatória' })
  rating: number;

  @IsNotEmpty({ message: 'Comentário é obrigatório' })
  comment: string;

  @IsNumber({}, { message: 'ID do filme é obrigatório' })
  movieId: number;
}
