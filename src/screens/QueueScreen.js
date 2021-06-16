import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';

export default function QueueScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text> QueueScreen </Text>
            <Text> QueueScreen </Text>
            <Text> QueueScreen </Text>
            <Text> QueueScreen </Text>
        </View>
     </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })