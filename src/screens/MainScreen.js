import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text> Main Screen</Text>
            <Text> Main Screen</Text>
            <Text> Main Screen</Text>
            <Text> Main Screen</Text>
            {/* <Button 
                onPress={() => navigation.navigate('Login')}
                title="Go to Profile"
            /> */}
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