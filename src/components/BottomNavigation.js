import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    ResetPasswordScreen,
    SwipperScreen,
} from '../screens';


const Tab = createBottomTabNavigator();




export default function BottomNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Welcome" component={SwipperScreen} />
            <Tab.Screen name="Reset Password" component={ResetPasswordScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        marginBottom: 8,
    },
})
