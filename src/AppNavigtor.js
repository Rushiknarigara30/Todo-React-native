import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewNotes from './Sceens/NewNotes';
import AllNotes from './Sceens/AllNotes';
const Stack = createNativeStackNavigator();
export default function AppNavigtor() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AllNotes"
          component={AllNotes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewNotes"
          component={NewNotes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
