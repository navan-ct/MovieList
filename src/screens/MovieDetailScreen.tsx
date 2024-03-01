import React, { useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Text, Chip, DataTable } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { type StackScreenProps } from '@react-navigation/stack';

import { useSelector, useDispatch } from '@/hooks';
import { getMovieById, selectMovie, selectIsLoading } from '@/store/movieSlice';
import { type RootStackParamList } from '@/types';

export type MovieDetailScreenProps = StackScreenProps<RootStackParamList, 'MovieDetail'>;

export function MovieDetailScreen({ route }: MovieDetailScreenProps) {
  const dispatch = useDispatch();
  const movie = useSelector(selectMovie);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getMovieById(route.params.movieId));
  }, [dispatch, route.params.movieId]);

  if (isLoading) return <ActivityIndicator />;
  if (!movie) return null;
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Card style={styles.movieContainer}>
        <Card.Cover source={{ uri: movie.poster }} style={styles.moviePoster} />
        <Card.Title title={`${movie.title} (${movie.year})`} subtitle={movie.genre} />

        <Card.Content>
          <DataTable style={styles.movieRatingsTable}>
            {movie.ratings.map((rating) => (
              <DataTable.Row key={rating.source}>
                <DataTable.Title>{rating.source}</DataTable.Title>
                <DataTable.Cell>{rating.value}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <MovieMembers role="Director" members={movie.director.split(', ')} />
          <MovieMembers role="Writer" members={movie.writer.split(', ')} />
          <MovieMembers role="Cast" members={movie.cast.split(', ')} />

          <Text style={styles.moviePlotTitle}>Plot</Text>
          <Text>{movie.plot}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

type MovieMembersProps = {
  role: string;
  members: string[];
};

function MovieMembers({ role, members }: MovieMembersProps) {
  return (
    <View style={styles.membersContainer}>
      <Text variant="labelSmall" style={styles.membersRole}>
        {role}
      </Text>
      <View style={styles.memberList}>
        {members.map((name) => (
          <Chip key={name}>{name}</Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(24)
  },
  movieContainer: {
    borderRadius: moderateScale(4)
  },
  moviePoster: {
    borderTopLeftRadius: moderateScale(4),
    borderTopRightRadius: moderateScale(4),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  movieRatingsTable: {
    marginTop: moderateScale(2),
    marginBottom: moderateScale(20)
  },
  membersContainer: {
    marginBottom: moderateScale(18)
  },
  membersRole: {
    textTransform: 'uppercase',
    marginBottom: moderateScale(4)
  },
  memberList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: moderateScale(4)
  },
  moviePlotTitle: {
    textTransform: 'uppercase',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(4)
  }
});
