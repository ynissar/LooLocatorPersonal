import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import Header from "./components/Header";
import uuid, { GenerateUUID } from "react-native-uuid";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";
import { washroom } from "./types";

const App = () => {
  const [washrooms, setWashrooms] = useState<washroom[]>([
    { id: uuid.v4(), washroomName: "example 1" },
    { id: uuid.v4(), washroomName: "example 2" },
    { id: uuid.v4(), washroomName: "example 3" },
    { id: uuid.v4(), washroomName: "example 4" },
  ]);

  const deleteWashroom = (id: string | number[]): void => {
    setWashrooms((prevWashrooms) => {
      return prevWashrooms.filter((washroom) => washroom.id != id);
    });
  };

  const addWashroom = (newWashroomName: string): void => {
    if (!newWashroomName) {
      Alert.alert("Error", "Please enter an item name");
    } else {
      setWashrooms((prevWashrooms) => {
        return [
          ...prevWashrooms,
          { id: uuid.v4(), washroomName: newWashroomName },
        ];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="HELLOOOOO!!!!"></Header>
      <AddItem addItem={addWashroom}></AddItem>
      <FlatList
        data={washrooms}
        renderItem={({ item }: { item: washroom }) => (
          <ListItem item={item} deleteItem={deleteWashroom}></ListItem>
        )}
      ></FlatList>
      <StatusBar></StatusBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  text: {
    color: "darkslateblue",
    fontSize: 30,
  },
});

export default App;
