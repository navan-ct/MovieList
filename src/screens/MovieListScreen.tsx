import React, { useState, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  FlatList,
  StyleSheet,
  type TextInput as ReactTextInput
} from 'react-native';
import { TextInput, Button, Card, ActivityIndicator } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { type StackScreenProps } from '@react-navigation/stack';

import { useSelector, useDispatch } from '@/hooks';
import { searchMovies, selectMovies, selectIsLoading } from '@/store/movieSlice';
import { type RootStackParamList } from '@/types';

export type MovieListScreenProps = StackScreenProps<RootStackParamList, 'MovieList'>;

export function MovieListScreen({ navigation }: MovieListScreenProps) {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const isLoading = useSelector(selectIsLoading);

  const [search, setSearch] = useState('Avengers');
  const searchRef = useRef<ReactTextInput>(null);

  function handleOutsidePress() {
    searchRef.current?.blur();
  }

  function handleSearch() {
    handleOutsidePress();
    if (search.length) dispatch(searchMovies(search));
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress} style={styles.touchable}>
      <View style={styles.container}>
        <TextInput
          label="Title"
          value={search}
          onChangeText={(value) => setSearch(value)}
          mode="outlined"
          style={styles.searchInput}
          ref={searchRef}
        />
        <Button
          onPress={handleSearch}
          disabled={isLoading}
          icon="magnify"
          mode="contained"
          style={styles.searchButton}
        >
          Search
        </Button>

        {movies.length ? (
          <View style={styles.movieListContainer}>
            <FlatList
              data={movies}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.movieListContentContainer}
              columnWrapperStyle={styles.movieColumnContainer}
              ListFooterComponent={<View style={styles.movieListFooter} />}
              renderItem={({ item }) => (
                <Card
                  key={item.id}
                  onPress={() => {
                    navigation.navigate('MovieDetail', {
                      movieId: item.id,
                      movieTitle: item.title
                    });
                  }}
                  style={styles.movieItem}
                >
                  <Card.Cover source={{ uri: item.poster }} style={styles.moviePoster} />
                  <Card.Title title={item.title} subtitle={item.year} />
                </Card>
              )}
            />
          </View>
        ) : null}

        {!movies.length && isLoading ? <ActivityIndicator /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16)
  },
  searchInput: {
    marginBottom: moderateScale(8)
  },
  searchButton: {
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(19)
  },
  movieListContainer: {
    flex: 1,
    borderRadius: moderateScale(4),
    overflow: 'hidden'
  },
  movieListContentContainer: {
    gap: moderateScale(8)
  },
  movieColumnContainer: {
    gap: moderateScale(8)
  },
  movieItem: {
    flex: 1,
    borderRadius: moderateScale(4),
    overflow: 'hidden'
  },
  moviePoster: {
    borderRadius: 0
  },
  movieListFooter: {
    paddingBottom: moderateScale(24)
  }
});
