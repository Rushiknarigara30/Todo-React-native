import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigtor from './src/AppNavigtor';
import Todo from './src/Sceens/Todo';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigtor />
      {/* <Todo/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
