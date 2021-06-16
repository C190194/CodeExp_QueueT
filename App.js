import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  MainScreen,
  QueueScreen,
  ProfileScreen,
  FavouriteScreen,
} from './src/screens'

import { theme } from './src/core/theme'
import { Provider } from 'react-native-paper'
import React from 'react';
import { Button, View, Text,Alert ,SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer ,DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AdminQueueStack from "./screens/AdminQueueStack";
import NextNumberScreen from "./screens/NextNumberScreen";
import NotificationScreen from "./screens/NotificationScreen";
import PendingListScreen from "./screens/PendingListScreen";


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Explore') {
        iconName = focused
        ? 'ios-add'
        : 'ios-add-outline';
      } else if (route.name === 'Queue') {
        iconName = focused
        ? 'people-circle'
        : 'people-circle-outline';
      }
      else if (route.name === 'Profile') {
        iconName = focused
        ? 'person'
        : 'person-outline';
      }
return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Explore" component={MainScreen} />
        <Tab.Screen name="Queue"  children={() => <QueueScreen navigation={navigation} />} />
        <Tab.Screen name="Profile" children={() => <ProfileScreen navigation={navigation} />} >
        </Tab.Screen>
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator 
          screenOptions={{
            headerBackTitleVisible: false,
            headerShown: false,
          }}
          >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="AppDrawer" component={AppDrawer}/>
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          {/* <Stack.Screen name="Admin Queue Stack" component={AdminQueueStack} />
          <Stack.Screen name="Next Number Screen" component={NextNumberScreen} />
          <Stack.Screen
            name="Pending List Screen"
            component={PendingListScreen}
          />
          <Stack.Screen
            name="Notification Screen"
            component={NotificationScreen}
          /> */}

          
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

// @TODO logout 
// https://stackoverflow.com/questions/61331840/how-do-i-add-a-log-out-button-to-my-drawer-using-react-navigation-v5
function AppDrawer({navigation}) {
  return (
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Favourites" component={FavouriteScreen} />
        {/* <Drawer.Screen name="Logout" component={() } /> */}
      </Drawer.Navigator>
  )
}

