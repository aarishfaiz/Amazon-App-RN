import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  // Set the header layout
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  // Set dummy data for user profile and orders
  useEffect(() => {
    const dummyUser = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const dummyOrders = [
      {
        _id: "1",
        products: [
          {
            _id: "1",
            image: "https://via.placeholder.com/100",
          },
        ],
      },
      {
        _id: "2",
        products: [
          {
            _id: "2",
            image: "https://via.placeholder.com/100",
          },
        ],
      },
    ];

    setUser(dummyUser);
    setOrders(dummyOrders);
    setLoading(false);
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Auth token cleared");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user?.name}
      </Text>

      <View style={styles.row}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Your orders</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Your Account</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Buy Again</Text>
        </Pressable>

        <Pressable onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#00CED1" />
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={styles.orderContainer}
              key={order._id}
            >
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  button: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
  },
  orderContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
