import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useSearchParams, useRouter, useLocalSearchParams } from "expo-router";
import { fetchWashroom } from "../../../components/AxiosFunctions";
import { IWashroom } from "../../../types";
import { WashroomDataContext } from "../../../components/MyContext";

const WashroomDetails = () => {
  const router = useRouter();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);

  const { id } = useSearchParams();
  const { washroomIndex } = useLocalSearchParams();
  const index = Number(washroomIndex);

  const route = `./edit/${id}`;

  console.log(washroomIndex);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>washroom {id}</Text>
        <View>
          <Text>{washroomsState[index].name}</Text>
          <Text>{washroomsState[index].rating}</Text>
          <Text>{washroomsState[index].street}</Text>
          {
            // map for comments
          }
        </View>
        <Text
          onPress={() => {
            router.back();
          }}
        >
          back
        </Text>
        <Text
          onPress={() => {
            router.push({
              pathname: route,
              params: { washroomIndex: washroomIndex },
            });
          }}
        >
          alternate
        </Text>
      </View>
    </View>
  );
};

export default WashroomDetails;

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
