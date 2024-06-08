import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CardReducer";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Dummy addresses data
  const dummyAddresses = [
    {
      _id: "1",
      name: "John Doe",
      houseNo: "123",
      street: "Main Street",
      landmark: "Near Park",
      mobileNo: "1234567890",
      postalCode: "560001",
    },
    {
      _id: "2",
      name: "Jane Smith",
      houseNo: "456",
      street: "Second Street",
      landmark: "Near Mall",
      mobileNo: "0987654321",
      postalCode: "560002",
    },
  ];
  
  const [addresses, setAddresses] = useState(dummyAddresses);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };

      const response = await axios.post(
        "http://localhost:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };

  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "INR",
        name: "Amazon",
        key: "rzp_test_E3GWYimxN7YMk8",
        amount: total * 100,
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "RazorPay Software",
        },
        theme: { color: "#F37254" },
      };

      const data = await RazorpayCheckout.open(options);

      console.log(data);

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await axios.post(
        "http://localhost:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={item._id}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    India, Bangalore
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    phone No : {item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    pin code : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Deliver Here</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Options
          </Text>
          <Pressable
            onPress={() => setSelectedOption("Prepaid")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 10,
            }}
          >
            {selectedOption == "Prepaid" ? (
              <MaterialIcons name="radio-button-checked" size={24} color="black" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                color="black"
              />
            )}
            <Text>Prepaid</Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedOption("Cash on Delivery")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 10,
            }}
          >
            {selectedOption == "Cash on Delivery" ? (
              <MaterialIcons name="radio-button-checked" size={24} color="black" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                color="black"
              />
            )}
            <Text>Cash on Delivery</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Payment Details</Text>
          {selectedOption == "Prepaid" ? (
            <Text>Enter Card Details</Text>
          ) : (
            <Text>Cash on Delivery Selected</Text>
          )}
        </View>
      )}

      {currentStep == 3 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Order Summary</Text>
          <Text>Selected Address: {selectedAddress.name}</Text>
          <Text>Selected Payment Method: {selectedOption}</Text>
          <Text>Total Amount: {total}</Text>
          <Pressable onPress={selectedOption === "Prepaid" ? pay : handlePlaceOrder}>
            <Text>Place Order</Text>
          </Pressable>
        </View>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
        <Pressable
          disabled={currentStep === 0}
          onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable
          disabled={currentStep === steps.length - 1}
          onPress={() => setCurrentStep((prevStep) => prevStep + 1)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    color: "blue",
  },
});
