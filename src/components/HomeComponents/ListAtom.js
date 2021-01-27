import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

function ListAtom({ measureName, measureValue, measureIcon }) {
  return (
    <View style={styles.listItemView}>
      <Feather name={measureIcon} size={24} color="red" />
      <View style={styles.measurementView}>
        <Text style={styles.listItemText}>{measureName}</Text>
        <Text>{measureValue}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  listItemView: {
    flexDirection: "row",
    alignItems: "center",
  },

  measurementView: {
    alignItems: "center",
    paddingLeft: 5,
  },

  listItemText: {
    fontSize: 18,
    color: "#232363",
  },
});

export default ListAtom;
