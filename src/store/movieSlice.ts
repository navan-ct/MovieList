import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import * as api from '@/api/movies';
import { type StoreState, type StoreDispatch } from '.';

export type MovieState = {
  movies: api.MovieListItem[];
  movie: api.MovieDetail | null;
  isLoading: boolean;
};

const initialState: MovieState = {
  movies: [],
  movie: null,
  isLoading: false
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<MovieState['movies']>) {
      state.movies = action.payload;
    },
    setMovie(state, action: PayloadAction<MovieState['movie']>) {
      state.movie = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const { setMovies, setMovie, setIsLoading } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;

export function searchMovies(title: string) {
  return async (dispatch: StoreDispatch) => {
    dispatch(setMovies([]));
    dispatch(setMovie(null));
    dispatch(setIsLoading(true));
    const result = await api.searchMovies(title);
    if (result) dispatch(setMovies(result.data));
    dispatch(setIsLoading(false));
  };
}

export function getMovieById(id: string) {
  return async (dispatch: StoreDispatch) => {
    dispatch(setMovie(null));
    dispatch(setIsLoading(true));
    const result = await api.getMovieById(id);
    if (result) dispatch(setMovie(result?.data));
    dispatch(setIsLoading(false));
  };
}

export function selectMovies(state: StoreState) {
  return state.movie.movies;
}
export function selectMovie(state: StoreState) {
  return state.movie.movie;
}
export function selectIsLoading(state: StoreState) {
  return state.movie.isLoading;
}
