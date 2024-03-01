import { http } from './http';
import { type GetMovieByIdResponse, type SearchMoviesResponse } from './types';

export type MovieListItem = {
  id: string;
  poster: string;
  title: string;
  year: string;
};

export async function searchMovies(title: string) {
  try {
    const response = await http.get<SearchMoviesResponse>('/', {
      params: { s: title }
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

    return { data: movies };
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
      params: { i: id, plot: 'full' }
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
