import { http } from './http';
import { GetMovieByIdResponse, type SearchMoviesResponse } from './types';

const PAGINATION_LIMIT = 10;

export type MovieListItem = {
  id: string;
  poster: string;
  title: string;
  year: string;
};

export async function searchMovies(title: string, page: number = 1) {
  try {
    const response = await http.get<SearchMoviesResponse>('/', {
      params: { s: title, page }
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    const movies: MovieListItem[] = response.data.Search.map((result) => ({
      id: result.imdbID,
      poster: result.Poster,
      title: result.Title,
      year: result.Year
    }));
    const pageCount = Math.ceil(Number(response.data.totalResults) / PAGINATION_LIMIT);

    return {
      data: movies,
      pagination: { total: pageCount, page }
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export type MovieDetail = {
  id: string;
  poster: string;
  title: string;
  rated: string;
  year: string;
  releaseDate: string;
  genre: string;
  director: string;
  writer: string;
  cast: string;
  language: string;
  plot: string;
  ratings: Array<{
    source: string;
    value: string;
  }>;
};

export async function getMovieById(id: string) {
  try {
    const response = await http.get<GetMovieByIdResponse>('/', {
      params: { i: id }
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    const { data } = response;
    const movie: MovieDetail = {
      id: data.imdbID,
      poster: data.Poster,
      title: data.Title,
      rated: data.Rated,
      year: data.Year,
      releaseDate: data.Released,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      cast: data.Actors,
      language: data.Language,
      plot: data.Plot,
      ratings: [
        {
          source: 'IMDb',
          value: data.imdbRating
        },
        ...data.Ratings.map((rating) => ({
          source: rating.Source,
          value: rating.Value
        }))
      ]
    };

    return { data: movie };
  } catch (error) {
    console.error(error);
    return null;
  }
}
