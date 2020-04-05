import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function (props) {
  const passedProps = {
    label: "Input",
    style: styles.root,
    mode: "outlined",
    value: "",
    onChangeText: (text) => console.log(text),
    ...props,
  };
  return <TextInput {...passedProps} />;
}

const styles = StyleSheet.create({
  root: {
    margin: 10,
  },
});
