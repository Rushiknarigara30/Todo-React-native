import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigtor from './src/AppNavigtor';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigtor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
