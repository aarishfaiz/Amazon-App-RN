import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister2 = () => {
    navigation.navigate("Main");
  };

  const handleRegister = () => {
    console.log("Register Button is Pressed");
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.183.137:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successfully Done",
          "You have successfully registered"
        );
        setName("");
        setEmail("");
        setPassword("");
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Registration Error");
        console.log("Registration Failed", error);
      });
    console.log("Register Button is Done");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/amazon.webp")}
            style={{ height: 100, width: 150 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Register to your Account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="account-circle"
              size={24}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="gray"
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="gray"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <AntDesign
              name="lock1"
              size={24}
              color="black"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="gray"
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 90, marginTop: 4,}}>
          <Text>Keep me logged In</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Forget Password
          </Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <Pressable onPress={handleRegister2} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 15 }}
          >
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 16 }}
              >
                Already have an account?
              </Text>
              <Text
                style={{ textAlign: "center", color: "blue", fontSize: 16 }}
              >
                Login
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  keepMeLoggedIn: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
