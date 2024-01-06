import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const MapPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Map Page</Text>
        <Link href={{ pathname: "/washroom/1", params: { message: "hello" } }}>
          washroom 1
        </Link>
        <Link href={{ pathname: "/washroom/2", params: { message: "hello" } }}>
          washroom 2
        </Link>
        <Link href={{ pathname: "/washroom/3", params: { message: "hello" } }}>
          washroom 3
        </Link>
        <Link href="/washroom/new">create a washroom</Link>
      </View>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
