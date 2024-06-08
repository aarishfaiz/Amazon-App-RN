import { StyleSheet, Text, View } from "react-native";
import React from "react";

import HomeScreen from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../screen/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import ProductInfoItem from "../components/ProductInfoItem";

import AddressScreen from "../screen/AddressScreen";
import AddAddressScreen from "../screen/AddAddressScreen";
import CardScreen from "../screen/CardScreen";
import ProfileScreen from "../screen/ProfileScreen";
import ConfirmationScreen from "../screen/ConfirmationScreen";
import OrderScreen from "../screen/OrderScreen";
import ConfirmationScreen2 from "../screen/ConfirmationScreen2";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            // headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Card"
          component={CardScreen}
          options={{
            tabBarLabel: "Card",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black " />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm2"
          component={ConfirmationScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
