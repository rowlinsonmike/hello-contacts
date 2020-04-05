import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Fab from "../components/FAB";

export default function (props) {
  const passedProps = {
    animationType: "slide",
    transparent: false,
    visible: false,
    onRequestClose: () => console.log("Pressed"),
    ...props,
  };
  return (
    <Modal {...passedProps}>
      {props.children}
      <Fab small={false} icon="exit-to-app" onPress={props.onClose} />
    </Modal>
  );
}

const styles = StyleSheet.create({});
