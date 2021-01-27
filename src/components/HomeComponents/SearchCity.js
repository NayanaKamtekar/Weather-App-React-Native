import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

const SearchCity = ({ searchCity }) => {
  const [text, setText] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Enter City..."
        style={styles.input}
        onChangeText={(text) => setText(text)}
        value={text}
        onSubmitEditing={() => {
          searchCity(text);
        }}
        onFocus={() => {
          setText("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 70,
    paddingTop: 20,
    margin: 15,
    textAlign: "center",
    color: "darkslateblue",
    fontSize: 35,
    justifyContent: "center",
    textAlign: "center",
    // backgroundColor:'red'
  },
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center",
  },
});

export default SearchCity;
