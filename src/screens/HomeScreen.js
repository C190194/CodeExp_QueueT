import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BottomNavigation from '../components/BottomNavigation'
import { View, Text } from 'react-native';
import useFetch from '../hooks/useFetch';


// https://medium.com/@kartiksachdeva/creating-instagram-like-bottom-navigation-bar-using-react-native-97ba63771fea


export default function HomeScreen({ navigation }) {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const { status, data } = useFetch(url)
    return (
        <Background>
            <BottomNavigation />
        </Background>
    )
}
