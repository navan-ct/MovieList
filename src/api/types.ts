type ErrorResponse = {
  Response: 'False';
  Error: string;
};

type SearchMoviesOkResponse = {
  Response: 'True';
  Search: Array<{
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
  }>;
  totalResults: string;
};

export type SearchMoviesResponse = SearchMoviesOkResponse | ErrorResponse;

type GetMovieByIdOkResponse = {
  Response: 'True';
  imdbID: string;
  Poster: string;
  Title: string;
  Rated: string;
  Year: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Plot: string;
  imdbRating: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
};

export type GetMovieByIdResponse = GetMovieByIdOkResponse | ErrorResponse;
