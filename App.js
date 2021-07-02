import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { blue, white } from './utils/colors';
import Decks from "./components/Decks"
import DeckView from "./components/DeckView"
import Add from "./components/Add"

import { StackRouter } from 'react-navigation';

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

function MyTabs(){
  return(
    
      <Tabs.Navigator
        screenOptions={({ route }) => ({
        
          tabBarIcon: ({ color, size }) => {
            let iconName
            if (route.name === 'Decks') {
              iconName = "ios-bookmarks"
                
            }
            else if (route.name === "Add") {
              iconName = "ios-add-circle"
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{ 
          activeTintColor: Platform.OS === "ios" ? blue : white,
          style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : blue,
            
          }
        }}
      >
        <Tabs.Screen name="Decks" component={Decks} />
        <Tabs.Screen name="Add" component={Add} />
        
      </Tabs.Navigator>
      
    
  )
 
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {MyTabs} />
        <Stack.Screen name = "DeckView" component = {DeckView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


