import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from 'src/reviews/entities/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  releaseDate: Date;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
