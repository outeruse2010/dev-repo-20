import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Constants from "expo-constants";
import { Provider as PaperProvider } from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import store from './Store';
import AppContent from './src/content/AppContent';
import { theme } from './src/utils/GlobalStyle';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <View style={styles.container}>
          <AppContent />
        </View>
      </ReduxProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:Constants.statusBarHeight,
  },
});
