import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { blue, white } from './utils/colors';
import Decks from "./components/Decks"
import Add from "./components/Add"

const Tabs = createBottomTabNavigator()
function MyTabs(){
  return(
    <NavigationContainer>
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
            // You can return any component that you like here!
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
    </NavigationContainer>
  )
 
}


export default function App() {
  return (
    <NavigationContainer>
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
            // You can return any component that you like here!
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

//Decks: {
  //screen: Decks,
    //navigationOptions: {
   // tabBarLabel: "Decks",
   //   tabBarIcon: Platform.OS === "ios"
   //     ? ({ tintColor }) => <Ionicons name="ios-bookmarks" size="30" color={tintColor} />
//: ({ tintColor }) => <Ionicons name="md-bookmarks" size="30" color={tintColor} />
 // }
//}
//}, {
 // navigationOptions: {
 //   header: null
 // },
  //tabBarOptions: {
  //  activeTintColor: Platform.OS === "ios" ? blue : white,
   //   style: {
   //   height: 56,
   //     backgroundColor: Platform.OS === "ios" ? white : blue,
  //  }
 // }