import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

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
      <Stack.Navigator headerMode='none'>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{ title: 'Home' }}
            />
            <Stack.Screen
              name='Task'
              component={Task}
              options={{ title: 'Task' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ title: 'Login' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
