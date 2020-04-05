import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function (props) {
  const text = props.text || "Press Me!";
  const passedProps = {
    icon: "camera",
    mode: "contained",
    style: styles.root,
    onPress: () => console.log("Pressed"),
    ...props,
  };
  return <Button {...passedProps}>{text}</Button>;
}

const styles = StyleSheet.create({
  root: {
    margin: 40,
    borderRadius: 10,
  },
});
