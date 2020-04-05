import React from "react";
import {
  StyleSheet,
  View,
  Linking,
  TouchableHighlight,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Title, Text, IconButton } from "react-native-paper";
import BaseCard from "../components/BaseCard";
import Icon from "../components/Icon";
import Storage from "../db";

const db = new Storage();

const ContactItem = ({ icon, text, type = "material", onPress }) => {
  let touchableProps = { underlayColor: "#888985" };
  if (onPress) {
    touchableProps.onPress = onPress;
  }
  return (
    <TouchableHighlight {...touchableProps}>
      <View style={styles.contactItem}>
        <Icon color="#888985" type={type} name={icon} />
        <View style={{ marginLeft: 10 }}>
          <Text>{text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const openDial = (number) => {
  if (Platform.OS === "android") {
    Linking.openURL(`tel:${number}`);
    return;
  }
  Linking.openURL(`telprompt:${number}`);
};
export default function Profile(props) {
  const {
    id,
    name,
    img,
    description,
    job,
    email,
    phone,
  } = props.route.params.item;
  const removeItem = async (id) => {
    await db.deleteById("contacts", id);
    props.navigation.navigate("Contacts", { update: true });
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#eb8cc7", "white"]}
        style={styles.linearGradientContainer}
      />
      <View style={styles.profileHeaderContainer}>
        <Avatar.Image size={160} source={{ uri: img }} />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onPress={() =>
              props.navigation.navigate("Edit", {
                id,
                name,
                img,
                description,
                job,
                email,
                phone,
              })
            }
            icon="account-edit"
            color="#eb8cc7"
            size={30}
          />
          <Title>{name}</Title>
          <IconButton
            onPress={() => removeItem(id)}
            small={false}
            icon="trash-can-outline"
            color="#eb8cc7"
            size={30}
          />
        </View>
      </View>
      <BaseCard>
        <View style={{ flex: 1 }}>
          <ContactItem
            icon="phone"
            text={phone}
            onPress={() => openDial(phone)}
          />
          <ContactItem
            icon="email"
            text={email}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          />
        </View>
      </BaseCard>
      <BaseCard>
        <View style={{ flex: 1 }}>
          <Text>{description}</Text>
        </View>
      </BaseCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  linearGradientContainer: {
    height: "20%",
  },
  profileHeaderContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: -80,
    justifyContent: "center",
    alignItems: "center",
  },
  contactItem: {
    padding: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contactItemText: {
    marginLeft: 10,
  },
});
