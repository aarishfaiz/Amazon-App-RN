import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import Search from "../components/Search";

import { Feather, AntDesign } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

export default function AddAddressScreen() {
  const navigation = useNavigation();
  const [addresses, setAddresses] =  useState([]);
  const { userId, setUserId } = useContext(UserType);


  useEffect(()=>{
    fetchAddress();
  },[]);

  const fetchAddress = async ()=>{
    try {
      const response = await axios.get(`http://192.168.183.137:8000/address/${userId}`)
      const {addresses} = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error in fetching the address", error);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Search />
      <View style={{ padding: 10 }}>
        <Text>Your Address</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons  name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
});
