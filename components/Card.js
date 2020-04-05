import React from "react";
import { Card, Avatar, Paragraph } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default ({ id, name, job, img, onPress }) => {
  return (
    <Card onPress={onPress} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.avatar}>
          <Avatar.Image
            size={50}
            source={{
              uri: img,
            }}
          />
        </View>
        <View style={styles.info}>
          <Paragraph style={styles.name}>{name}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    padding: 0,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    paddingRight: 15,
  },
  info: {
    display: "flex",
  },
  name: {
    fontSize: 20,
  },
  job: {
    fontSize: 10,
  },
});
