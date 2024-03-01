import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { type StackScreenProps } from '@react-navigation/stack';

import { useSelector, useDispatch } from '@/hooks';
import { searchMovies, selectMovies, selectPagination } from '@/store/movieSlice';
import { type RootStackParamList } from '@/types';

export type MovieListScreenProps = StackScreenProps<RootStackParamList, 'MovieList'>;

export function MovieListScreen({ navigation }: MovieListScreenProps) {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    dispatch(searchMovies('avengers'));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {movies.map((movie) => (
        <Button
          key={movie.id}
          onPress={() => {
            navigation.navigate('MovieDetail', {
              movieId: movie.id,
              movieTitle: movie.title
            });
          }}
        >
          {movie.title}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
