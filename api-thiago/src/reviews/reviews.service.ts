import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewsRepository.create(createReviewDto);
    return await this.reviewsRepository.save(review);
  }

  async findAll() {
    return await this.reviewsRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id }, // Encontrar a revisão pelo ID
    });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id); // Verifica se a revisão existe
    Object.assign(review, updateReviewDto); // Atualiza os dados
    return await this.reviewsRepository.save(review);
  }

  async remove(id: number) {
    const review = await this.findOne(id); // Verifica se a revisão existe
    return await this.reviewsRepository.remove(review);
  }
}
