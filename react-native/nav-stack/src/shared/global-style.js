import {StyleSheet} from 'react-native';
import constant from 'expo-constants';
import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    roundness:2,
    colors:{
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};

export const gstyle = StyleSheet.create({
    rootcontainer:{
        flex: 1,
        marginTop: constant.statusBarHeight,     
    },
});
