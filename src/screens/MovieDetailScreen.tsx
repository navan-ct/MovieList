import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { type StackScreenProps } from '@react-navigation/stack';

import { useSelector, useDispatch } from '@/hooks';
import { getMovieById, selectMovie } from '@/store/movieSlice';
import { type RootStackParamList } from '@/types';

export type MovieDetailScreenProps = StackScreenProps<RootStackParamList, 'MovieDetail'>;

export function MovieDetailScreen({ route }: MovieDetailScreenProps) {
  const dispatch = useDispatch();
  const movie = useSelector(selectMovie);

  useEffect(() => {
    dispatch(getMovieById(route.params.movieId));
  }, [dispatch, route.params.movieId]);

  if (!movie) return null;
  return (
    <View style={styles.container}>
      <Text>{movie.title}</Text>
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
