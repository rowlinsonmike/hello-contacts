import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
export default function (props) {
  const passedProps = {
    style: styles.fab,
    small: true,
    icon: "plus",
    onPress: () => console.log("pressed"),
    ...props,
  };
  return <FAB {...passedProps} />;
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
