import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  IconButton,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import CreateContact from "./screens/CreateContact";
import Constants from "expo-constants";
import Profile from "./screens/Profile";
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#eb8cc7",
    accent: "#eb8cc7",
  },
};

const ImageHeader = (props) => {
  return (
    <View
      style={{
        width: "100%",
        height: 40,
        justifyContent: "flex-end",
        padding: 5,
        backgroundColor: "transparent",
        padding: 0,
        margin: 0,
        marginTop: Constants.statusBarHeight,
        marginBottom: 10,
      }}
    >
      <Image
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        source={require("./assets/contact_banner.png")}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {props.LeftButton}
        <Text
          style={{
            marginLeft: props.LeftButton ? 0 : 10,
            color: "white",
            fontSize: 25,
          }}
        >
          {props.title}
        </Text>
      </View>
    </View>
  );
  // const BackButton = props.leftButton;
  // return (
  //   <View style={{ backgroundColor: "#eee" }}>
  //     {/* <Image
  //       source={{ uri: Banner }}
  //     /> */}
  //     <BackButton />
  //     <Text {...props} style={{ backgroundColor: "transparent" }}>
  //       {props.title}
  //     </Text>
  //   </View>
  // );
};
const stackScreenOptions = {
  // headerTintColor: "white",
  header: ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
      <ImageHeader
        title={title}
        LeftButton={
          previous ? (
            <IconButton
              color="white"
              icon="arrow-left"
              size={30}
              onPress={navigation.goBack}
            />
          ) : undefined
        }
      />
    );
  },
  // headerStyle: {
  //   backgroundColor: "transparent",
  //   height: 80,
  //   // backgroundImage: `url(${require("./assets/contact_banner.png")})`,
  // },
};
export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Contacts"
              component={Home}
              options={{
                title: "Contacts",
                ...stackScreenOptions,
              }}
            />
            <Stack.Screen
              name="CreateContact"
              component={CreateContact}
              options={{
                title: "Create",
                ...stackScreenOptions,
              }}
            />
            <Stack.Screen
              name="Edit"
              component={CreateContact}
              options={{
                title: "Edit",
                ...stackScreenOptions,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Contact",
                ...stackScreenOptions,
              }}
            />
          </Stack.Navigator>
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
