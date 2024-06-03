import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../Screens/Home/Home.jsx"
import BusinessListByCategory from "../Screens/BusinessListByCategory/BusinessListByCategory.jsx"
import BusinessDetail
 from '../Screens/BusinessDetail/BusinessDetail.jsx';
const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="business-list" component={BusinessListByCategory} />
        <Stack.Screen name="business-detail" component={BusinessDetail} />
    </Stack.Navigator>
  )
}