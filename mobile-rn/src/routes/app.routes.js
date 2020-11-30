import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Pages */
import Home from '../views/Home';
import Task from '../views/Task';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator headerMode='none'>
    <AppStack.Screen name='Home' component={Home} />
    <AppStack.Screen name='Task' component={Task} />
  </AppStack.Navigator>
);

export default AppRoutes;
