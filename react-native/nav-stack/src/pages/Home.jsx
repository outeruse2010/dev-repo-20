import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';

const Home = ({navigation}) => {

    const dataFromHome={data: 'Data from Home'};

    return (
        <View>
            <Text>Home Screen</Text>

            {/* <TouchableOpacity onPress={()=>navigation.navigate('About',{item:dataFromHome})}>
                <Text>Go TO About Screen</Text>
            </TouchableOpacity> */}
            <Button raised theme={{ roundness: 3 }}
                onPress={()=>navigation.navigate('About',{item:dataFromHome})}> 
                <Text> About Screen</Text>
            </Button>
            <Button 
                onPress={()=>navigation.navigate('Contact',{item:dataFromHome})}> 
                <Text> Contact Screen</Text>
            </Button>
        </View>
    );
};

export default Home;
