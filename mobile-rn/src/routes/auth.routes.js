import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../views/Login';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name='Login' component={Login} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
