import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

export type StackNavigatorParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
export const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
