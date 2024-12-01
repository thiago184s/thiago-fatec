import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Movie } from 'src/movies/entities/movie.entity';
  
  @Entity()
  export class Review {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    rating: number;
  
    @Column()
    comment: string;
  
    @Column()
    movieId: number;
  
    @ManyToOne(() => Movie, (movie) => movie.reviews)
    @JoinColumn({ name: 'movieId' })
    movie: Movie;
  }
  
