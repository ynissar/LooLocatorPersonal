import React, { Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/FontAwesome";
import { washroom } from "../types";

interface ItemProps {
  item: washroom;
  deleteItem: (id: string | number[]) => void;
}

const ListItem: React.FC<ItemProps> = ({ item, deleteItem }) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.washroomName}</Text>
        <Ionicons
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteItem(item.id)}
        ></Ionicons>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  listItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 15,
  },
});

export default ListItem;
