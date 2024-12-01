import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';


@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, MoviesModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

