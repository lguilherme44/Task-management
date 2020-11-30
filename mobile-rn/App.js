import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';

import Routes from './src/routes';

/* Disable alerts */
console.disableYellowBox = true;

/* Pages */
import Login from './src/views/Login';
import Home from './src/views/Home';
import Task from './src/views/Task';

/* Native Base */
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   async function isSigned() {
  //     try {
  //       await AsyncStorage.getItem('@storage_key');
  //     } catch (e) {
  //       alert(e);
  //     }
  //   }

  //   isSigned();
  // }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true);
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
