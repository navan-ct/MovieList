import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import {
  PaperProvider,
  MD3DarkTheme,
  adaptNavigationTheme,
  configureFonts
} from 'react-native-paper';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { store } from '@/store';
import { MovieListScreen, MovieDetailScreen } from '@/screens';
import { AppBar } from '@/components';
import { type RootStackParamList } from '@/types';

const paperTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({
    config: {
      fontFamily: 'Inter'
    }
  })
};
const { DarkTheme: navigationTheme } = adaptNavigationTheme({
  reactNavigationDark: DarkTheme
});

const RootStack = createStackNavigator<RootStackParamList>();

export function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <RootStack.Navigator initialRouteName="MovieList" screenOptions={{ header: AppBar }}>
            <RootStack.Screen
              name="MovieList"
              component={MovieListScreen}
              options={{ title: 'Movies' }}
            />
            <RootStack.Screen
              name="MovieDetail"
              component={MovieDetailScreen}
              options={({ route }) => ({ title: route.params.movieTitle })}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
