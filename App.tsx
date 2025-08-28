import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/app/Home';
import ShowDetailScreen from './src/app/ShowDetailScreen';
import 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";

/// Parameters received by each screen
export type RootStackParamList = {
  Home: undefined;
  ShowDetailScreen: { showId: number };
  ScrollTestUltra: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["http://localhost:8081"],
  config: {
    screens: {
      Home: "home",
      ShowDetailScreen: "home/detail/:showId",
    },
  },
};

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="Home" id={undefined} screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ShowDetailScreen" component={ShowDetailScreen} />            
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
  ); 
}