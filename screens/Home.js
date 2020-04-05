import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Fab from "../components/FAB";
import Card from "../components/Card";
import Storage from "../db";

const db = new Storage();
const datum = [
  {
    id: 1,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Bro Dog",
    job: "Professional BAMF",
    img:
      "https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Danielle",
    job: "Bad Ass",
    img:
      "https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Gigi",
    job: "Relaxation Expert",
    img:
      "https://images.unsplash.com/photo-1584997159889-8bb96d0a2217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Dudette",
    job: "Racket Ball Player",
    img:
      "https://images.unsplash.com/photo-1566895733200-2dea2602a0e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 5,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Bro Dog",
    job: "Professional BAMF",
    img:
      "https://images.unsplash.com/photo-1585602173562-e7eeb0e6f380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 6,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Danielle",
    job: "Bad Ass",
    img:
      "https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 7,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Gigi",
    job: "Relaxation Expert",
    img:
      "https://images.unsplash.com/photo-1584997159889-8bb96d0a2217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 8,
    email: "abc@yahoooo.com",
    phone: "123-123-1234",
    description:
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Dudette",
    job: "Racket Ball Player",
    img:
      "https://images.unsplash.com/photo-1566895733200-2dea2602a0e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  },
];
export default function Home(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      await db.checkDataStore();
      let contacts = await db.getItemValue("contacts");
      if (!contacts) {
        await db.setItem("contacts", JSON.stringify(datum));
      }
      contacts = await db.getItemValue("contacts");
      if (contacts) {
        setData(JSON.parse(contacts));
      }
    })();
  }, [props]);
  return (
    <View style={{ flex: 1, backgroundColor: "#888985" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Card
            onPress={() => props.navigation.navigate("Profile", { item })}
            {...item}
          />
        )}
      />
      <Fab
        onPress={() => props.navigation.navigate("CreateContact")}
        small={false}
      />
    </View>
  );
}
