import React, { useState, useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  IntroductionScreen,
  HomeScreen
} from './src/screens';
import { StyleSheet, SafeAreaView, Button } from 'react-native';


// headerStyle: { backgroundColor: 'transparent' }
const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider theme={theme}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Splitwise" component={StartScreen} />
          <Stack.Screen name="Login " component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          {/* <Stack.Screen name="Introduction" component={IntroductionScreen}  /> */}
          {/* <Stack.Screen name="Introduction" component={IntroductionScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Introduction" component={IntroductionScreen} options={{
            title: '',
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerRight: () => (
              <Button
                onPress={() =>  navigation.navigate('Home')}
                title="Skip"
                color="#fff"
              />
            ),
          }} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </Provider >
  )
}

// const styles = StyleSheet.create({
//   button: {
//     paddingRight:50
//   }
// })


// https://stackoverflow.com/questions/49477330/modifying-back-button-with-react-navigation-on-specific-screen
