import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import AppContent from './src/AppContent';
import { gstyle } from './src/shared/global-style';


export default function App() {

  //const AppNav = createNavigatorFactory();

  return (
    <PaperProvider theme={gstyle.theme}>
        <View style={gstyle.rootcontainer}>
          <View><Text>Stack Navigation</Text></View>
          <AppContent/>
        </View>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
