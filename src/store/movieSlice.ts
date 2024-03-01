import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import * as api from '@/api/movies';
import { store, StoreState, type StoreDispatch } from '.';

export type MovieState = {
  movies: api.MovieListItem[];
  pagination: {
    total: number;
    page: number;
  };
  movie: api.MovieDetail | null;
};

const initialState: MovieState = {
  movies: [],
  pagination: {
    total: 1,
    page: 1
  },
  movie: null
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<MovieState['movies']>) {
      state.movies = action.payload;
    },
    setPagination(state, action: PayloadAction<MovieState['pagination']>) {
      state.pagination = action.payload;
    },
    setMovie(state, action: PayloadAction<MovieState['movie']>) {
      state.movie = action.payload;
    }
  }
});

export const { setMovies, setPagination, setMovie } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;

export function searchMovies(title: string) {
  return async (dispatch: StoreDispatch, getState: typeof store.getState) => {
    const state = getState();
    const result = await api.searchMovies(title, state.movie.pagination.page);

    if (result) {
      dispatch(setMovies(result.data));
      dispatch(setPagination(result.pagination));
    }
  };
}

export function getMovieById(id: string) {
  return async (dispatch: StoreDispatch) => {
    const result = await api.getMovieById(id);
    if (result) {
      dispatch(setMovie(result?.data));
    }
  };
}

export function selectMovies(state: StoreState) {
  return state.movie.movies;
}
export function selectPagination(state: StoreState) {
  return state.movie.pagination;
}
export function selectMovie(state: StoreState) {
  return state.movie.movie;
}
