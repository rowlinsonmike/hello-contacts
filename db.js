import React from "react";
import { AsyncStorage } from "react-native";
import Constants from "expo-constants";
const config = Constants.manifest.extra;

export default class extends React.Component {
  constructor() {
    super();
    this.checkDataStore();
  }

  async checkDataStore() {
    const dataStoreInitialised = await this.itemExists(
      config.storeStateRootKey
    );
    console.log(`Datastore exists: ${dataStoreInitialised}`);
    if (dataStoreInitialised === false) {
      await this.initStore();
    } else {
      console.log(`Loading Datastore: ${config.storeStateRootKey}`);
    }
  }

  recreateStore() {
    this.wipeStore();
    this.initStore();
  }

  wipeStore() {
    try {
      AsyncStorage.clear();
      console.log("Cleared datastore");
    } catch (e) {
      console.log(`Error clearing datastore: ${e}`);
    }
  }

  async initStore() {
    console.log("Initialised Datastore");
    await this.setItem(config.storeStateRootKey, "root");
  }

  async itemExists(key) {
    return (await AsyncStorage.getItem(key)) != null;
  }

  async getItemValue(key) {
    return await AsyncStorage.getItem(key);
  }

  async setItem(key, value) {
    AsyncStorage.setItem(key, value);
  }

  async deleteById(key, id) {
    let values = await this.getItemValue(key);
    values = JSON.stringify(JSON.parse(values).filter((v) => v.id !== id));
    await this.setItem(key, values);
  }

  async updateById(key, id, data) {
    let values = await this.getItemValue(key);
    values = JSON.stringify(
      JSON.parse(values).map((v) => {
        if (v.id === id) {
          v = { ...v, ...data };
        }
        return v;
      })
    );
    await this.setItem(key, values);
  }
  async add(key, data) {
    let values = await this.getItemValue(key);
    values = JSON.parse(values);
    values.push(data);
    values = JSON.stringify(values);
    await this.setItem(key, values);
  }
}
