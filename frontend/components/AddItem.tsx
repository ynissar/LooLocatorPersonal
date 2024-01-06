import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/FontAwesome";

interface AddItemProps {
  addItem: (newItem: string) => void;
}

const AddItem: React.FC<AddItemProps> = ({ addItem }) => {
  const [text, setText] = useState<string>("");

  const onTextChange = (textValue: string) => setText(textValue);

  return (
    <View>
      <TextInput
        placeholder="Add washroom..."
        style={styles.input}
        onChangeText={onTextChange}
      ></TextInput>
      <TouchableOpacity style={styles.btn} onPress={() => addItem(text)}>
        <Text style={styles.btnText}>
          <Ionicons name="plus" size={20} /> Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center",
  },
});

export default AddItem;
