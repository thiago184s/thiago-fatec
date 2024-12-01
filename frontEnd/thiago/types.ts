export interface Movie {
    id: number;
    title: string;
    director: string;
    releaseDate: string;
  }


  export interface Comment {
    id: number;
    rating: number;
    comment: string;
    movieId: number;
  }