import 'react-native-gesture-handler';
import React from 'react';
import {
  PaperProvider,
  MD3DarkTheme,
  adaptNavigationTheme,
  configureFonts
} from 'react-native-paper';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MovieListScreen, MovieDetailScreen } from '@/screens';
import AppBar from '@/components/AppBar';

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

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="MovieList" screenOptions={{ header: AppBar }}>
          <Stack.Screen
            name="MovieList"
            component={MovieListScreen}
            options={{ title: 'Movies' }}
          />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
