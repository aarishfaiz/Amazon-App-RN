import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incementQuantity, removeFromCart } from '../redux/CardReducer';
import { useNavigation } from '@react-navigation/native';
import Search from '../components/Search';

export default function CardScreen() {
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    console.log(total);

    const dispatch = useDispatch();

    const increaseQuantity = (item) => {
        dispatch(incementQuantity(item));
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(decrementQuantity(item));
        } else {
            deleteItem(item);
        }
    };

    const deleteItem = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <ScrollView style={styles.container}>
            <Search />
            <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalText}>Subtotal: </Text>
                <Text style={styles.totalText}>{total}</Text>
            </View>
            <Text style={styles.emiText}>EMI available</Text>
            <Pressable onPress={() => navigation.navigate("Confirm2")} style={styles.proceedButton}>
                <Text style={{ fontSize: 20, fontWeight: '500'}} >Proceed to Buy ({cart.length}) items</Text>
            </Pressable>

            <View style={styles.itemsContainer}>
                {cart?.map((item, index) => (
                    <View style={styles.itemCard} key={index}>
                        <Pressable style={styles.itemContent}>
                            <Image style={styles.itemImage} source={{ uri: item?.image }} />
                            <View style={styles.itemDetails}>
                                <Text numberOfLines={3} style={styles.itemTitle}>{item?.title}</Text>
                                <Text style={styles.itemPrice}>{item?.price}</Text>
                            </View>
                            <View style={styles.stockContainer}>
                                <Image style={styles.stockIcon} source={{ uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png" }} />
                                <Text style={styles.stockText}>In Stock</Text>
                            </View>
                        </Pressable>

                        <View style={styles.quantityContainer}>
                            <Pressable onPress={() => decreaseQuantity(item)} style={styles.quantityButton}>
                                <AntDesign name="minus" size={24} color="black" />
                            </Pressable>
                            <View style={styles.quantityDisplay}>
                                <Text>{item?.quantity}</Text>
                            </View>
                            <Pressable onPress={() => increaseQuantity(item)} style={styles.quantityButton}>
                                <Feather name="plus" size={24} color="black" />
                            </Pressable>
                        </View>

                        <Pressable onPress={() => deleteItem(item)} style={styles.deleteButton}>
                            <Text>Delete</Text>
                        </Pressable>

                        <View style={styles.actionButtons}>
                            <Pressable style={styles.actionButton}>
                                <Text>Save for Later</Text>
                            </Pressable>
                            <Pressable style={styles.actionButton}>
                                <Text>See more like this</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 55,
        flex: 1,
        backgroundColor: 'white',
    },
    subtotalContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtotalText: {
        fontSize: 18,
        fontWeight: '400',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emiText: {
        marginHorizontal: 10,
    },
    proceedButton: {
        backgroundColor: '#FFC72C',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
    },
    proceedButtonText: {
        borderWidth: 1,
        borderColor: "#D0D0D0",
        height: 1,
        marginTop: 16,
    },
    itemsContainer: {
        marginHorizontal: 10,
    },
    itemCard: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderBottomColor: "#F0F0F0",
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    itemContent: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemImage: {
        height: 140,
        width: 140,
        resizeMode: "contain",
    },
    itemDetails: {
        width: 150,
        marginTop: 10,
    },
    itemTitle: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6,
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stockIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    stockText: {
        color: "green",
    },
    quantityContainer: {
        marginTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#D0D0D0',
        padding: 7,
        borderRadius: 6,
    },
    quantityDisplay: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 6,
    },
    deleteButton: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    actionButton: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginRight: 10,
    },
});
