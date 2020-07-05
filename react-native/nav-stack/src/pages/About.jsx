import React from 'react';
import {View,Text} from 'react-native';
import { createNavigatorFactory } from '@react-navigation/native';

const About = (props) => {

    console.log('PPP',props);
    const navigation = props.navigation;
    const route = props.route;
    const item = route.params.item;
    return (
        <View>
            <Text>About Screen</Text>
    <Text>{item.data}</Text>
        </View>
    );
};

export default About;
