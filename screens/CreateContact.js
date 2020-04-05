import React, { useState } from "react";
import { StyleSheet, View, Alert, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Modal from "../components/Modal";
import Storage from "../db";

const db = new Storage();

export default function CreateContact(props) {
  const getDetails = (key) =>
    props.route.params ? props.route.params[key] : "";

  props.route.params;
  const [name, setName] = useState(getDetails("name"));
  const [description, setDescription] = useState(getDetails("description"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [picture, setPicture] = useState(getDetails("img"));
  const [modal, setModal] = useState(false);
  const [enableShift, setEnableShift] = useState(false);
  const saveContact = async () => {
    const newContact = {
      name,
      description,
      phone,
      email,
      img: picture,
      id: props.route.params
        ? props.route.params.id
        : Math.random() * 10000000000000000,
    };
    if (props.route.params) {
      await db.updateById("contacts", newContact.id, newContact);
    } else {
      await db.add("contacts", newContact);
    }
    props.navigation.navigate("Contacts", { update: true });
  };
  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (!granted) {
      Alert.alert("App requires Camera Permissions.");
      return;
    }
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!data.cancelled) {
      let localLocation =
        FileSystem.documentDirectory + data.uri.split("/").slice(-1)[0];
      let download = await FileSystem.moveAsync({
        from: data.uri,
        to: localLocation,
      });
      setPicture(localLocation);
      setModal(false);
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (!granted) {
      Alert.alert("App requires Camera Permissions.");
      return;
    }
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!data.cancelled) {
      let localLocation =
        FileSystem.documentDirectory + data.uri.split("/").slice(-1)[0];
      let download = await FileSystem.moveAsync({
        from: data.uri,
        to: localLocation,
      });
      setPicture(localLocation);
      setModal(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableShift}
    >
      <View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onFocus={() => setEnableShift(false)}
        />
        <TextInput
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setEnableShift(false)}
        />
        <TextInput
          label="Phone"
          value={phone}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
          onFocus={() => setEnableShift(false)}
        />
        <TextInput
          label="Description"
          value={description}
          multiline
          numberOfLines={5}
          onChangeText={(text) => setDescription(text)}
          onFocus={() => setEnableShift(true)}
        />
        <Button
          icon={picture ? "check" : "upload"}
          style={styles.pictureModalButton}
          text="Upload Picture"
          onPress={() => setModal(true)}
        />
        <Modal
          visible={modal}
          onRequestClose={() => setModal(false)}
          onClose={() => setModal(false)}
        >
          <View style={styles.pictureModalContainer}>
            <Button
              icon="image-area"
              style={styles.pictureModalContainerButton}
              onPress={pickFromGallery}
              text="Gallery"
            />
            <Button
              icon="camera"
              style={styles.pictureModalContainerButton}
              onPress={pickFromCamera}
              text="Camera"
            />
          </View>
        </Modal>
        <Button
          style={styles.pictureModalButton}
          icon="content-save"
          text="Save"
          onPress={saveContact}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  pictureModalButton: {
    margin: 10,
  },
  pictureModalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pictureModalContainerButton: {
    padding: 10,
    margin: 10,
  },
});
