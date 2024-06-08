import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function AddressScreen() {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Token", token);
      const decodedToken = jwt_decode(token);
      console.log("decodeToken",decodedToken);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("User Id:", userId);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };
    axios
      .post("http://192.168.183.137:8000/address", { userId, address })
      .then((response) => {
        Alert.alert("Address Add", Success);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full name (First and last name)
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="enter your name"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile numebr
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
          onPress={() => handleAddAddress()}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
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
