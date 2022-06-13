import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold, useFonts
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StatusBar  barStyle="light-content" backgroundColor="transparent" translucent/>
            <AppRoutes />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
  );
}
