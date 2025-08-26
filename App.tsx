import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/app/Home';
import ShowDetailScreen from './src/app/ShowDetailScreen';
import "./global.css"
import 'react-native-reanimated';


/// Parameters received by each screen
export type RootStackParamList = {
    Home: undefined;
    ShowDetailScreen: { showId: number, showImage: string, showTitle: string};
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
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home" id={undefined}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShowDetailScreen" component={ShowDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }