import React from "react";
import { Card, Avatar, Paragraph } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default (props) => {
  const passedProps = { style: styles.card, ...props };
  return (
    <Card {...passedProps}>
      <Card.Content style={styles.cardContent}>{props.children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
