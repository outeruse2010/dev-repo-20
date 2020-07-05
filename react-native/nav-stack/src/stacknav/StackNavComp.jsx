import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';

//https://heartbeat.fritz.ai/getting-started-with-stack-navigator-using-react-navigation-5-in-react-native-and-expo-apps-4c516becaee1

const StackNavComp = () => {

    const StackNav = createStackNavigator();

    return (
        <StackNav.Navigator mode='modal' initialRouteName='Home' screenOptions={{gestureEnabled:true}} >
            <StackNav.Screen name='Home' component={Home} options={{title:'Home Screen'}}/>
            <StackNav.Screen name='About' component={About}/>
            <StackNav.Screen name='Contact' component={Contact}/>
        </StackNav.Navigator>
    );
};

export default StackNavComp;
