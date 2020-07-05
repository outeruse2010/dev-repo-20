import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavComp from './stacknav/StackNavComp';

const AppContent = () => {

    return (
        <NavigationContainer>
            <StackNavComp></StackNavComp>
        </NavigationContainer>
    );
};
export default AppContent;
