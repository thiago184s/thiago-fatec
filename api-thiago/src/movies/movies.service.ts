import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({
        where: { id }, // Passando o id como parte do objeto de opções
    });
    if (!movie) {
        throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
}

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id); // Verifica se o filme existe
    Object.assign(movie, updateMovieDto); // Atualiza os dados
    return await this.moviesRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id); // Verifica se o filme existe
    return await this.moviesRepository.remove(movie);
  }
}
