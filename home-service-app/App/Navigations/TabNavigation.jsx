import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import Booking from '../Screens/Booking/Booking';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // to hide the header
        tabBarActiveTintColor:Colors.PRIMARY
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (                            //size and color is set dynamically by react navigation
            <FontAwesome name="home" size={size} color={color} />
          )
        }}
      />


      <Tab.Screen name="Profile" 
      component={Profile} 
      options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Profile</Text>
        ),
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="Booking" 
      component={Booking} 
      options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Booking</Text>
        ),
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" size={size} color={color} />
        )
      }}/>
    </Tab.Navigator>
  );
}
