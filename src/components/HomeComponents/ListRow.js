import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import ListAtom from "./ListAtom";

function ListRow({ rowMembers }) {
  let row = rowMembers.map((rowMember) => (
    <ListAtom
      measureName={rowMember.measureName}
      measureValue={rowMember.measureValue}
      measureIcon={rowMember.measureIcon}
    />
  ));
  return <View style={styles.listWrapper}>{row}</View>;
}
const styles = StyleSheet.create({
  listWrapper: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ListRow;
