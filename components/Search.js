import { StyleSheet, View, Pressable, TextInput, Platform } from 'react-native'
import React from 'react'

import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

export default function Search() {
  return (
    <View style={styles.searchContainer}>
    <Pressable style={styles.searchPressable}>
      <AntDesign
        style={{ paddingLeft: 10 }}
        name="search1"
        size={24}
        color="black"
      />
      <TextInput
        placeholder="Search Amazon.in"
        style={styles.searchInput}
      />
    </Pressable>
    <Feather name="mic" size={24} color="black" />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      },
      searchPressable: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 3,
        height: 38,
        flex: 1, 
      },
      searchInput: {
        flex: 1, 
      },
      searchContainer: {
        backgroundColor: "#00CED1", // Corrected color code with #
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      },
})