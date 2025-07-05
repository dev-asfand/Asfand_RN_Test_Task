/**
 * React Native Location Search App
 * Features: Google Maps Place Search, History Management, and Map Display
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <HomeScreen />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
