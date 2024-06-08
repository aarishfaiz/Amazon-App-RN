import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error in User State:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    console.log("Login Button is Pressed")
    const user = {
      email: email,
      password: password,
    };

    // 192.168.183.137
    axios
      .post("http://192.168.183.137:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        console.log("Login Error", error);
        Alert.alert("Login error", "Please check your credentials and try again.");
      });

      console.log("Login Button is Done")
  };
  const handleLogin2 = ()=> {
    navigation.navigate("Main")
  }

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
            Login to your Account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              style={{ marginLeft: 7 }}
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
          <Pressable
            onPress={handleLogin2}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
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
                Sign up
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
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  loginButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
