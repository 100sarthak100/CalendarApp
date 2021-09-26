import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Calendar from './src/screens/Calendar';
import MainBttomTabNavigation from "./src/navigation";


export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MainBttomTabNavigation />
      {/* <Calendar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});
