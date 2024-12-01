import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @IsNotEmpty({ message: 'Diretor é obrigatório' })
  director: string;

  @IsNotEmpty({ message: 'Data de lançamento é obrigatória' })
  releaseDate: Date;
}

