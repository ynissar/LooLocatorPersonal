import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useRouter } from "expo-router";
import {
  createWashroom,
  fetchWashrooms,
} from "../../../components/AxiosFunctions";
import axios from "axios";
import { IWashroom } from "../../../types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Slider from "@react-native-community/slider";
import { WashroomDataContext } from "../../../components/MyContext";

interface IWashroomCreateInput extends IWashroom {}

const CreateWashroom = () => {
  const router = useRouter();
  const [latitude, changeLatitude] = useState<number>();
  const [longitude, changeLongitude] = useState<number>();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IWashroomCreateInput>({
    defaultValues: {
      accessibility: {
        childFriendly: false,
        disabilityFriendly: false,
        genderless: false,
      },
    },
  });

  const onSubmit: SubmitHandler<IWashroomCreateInput> = async (data) => {
    let { name, rating, street, accessibility, coordinates } = data;

    await createWashroom({
      name: name,
      rating: rating,
      coordinates: coordinates,
      street: street,
      accessibility: accessibility,
    });

    const washroomData = await fetchWashrooms();
    setWashrooms(washroomData.washrooms);
  };

  useEffect(() => {
    setValue("street", "street");
    console.log(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>create a washroom</Text>
        <Text
          onPress={() => {
            router.back();
          }}
        >
          back
        </Text>
        {/* Basic Washroom Info */}
        <Text>Name of Place</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="name"
              onChangeText={onChange}
              value={value}
            ></TextInput>
          )}
        ></Controller>
        {errors.name && <Text>This is required</Text>}
        <Text>Rating</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={5}
              minimumTrackTintColor="#90e0ef"
              maximumTrackTintColor="#EEEEEE"
              onValueChange={onChange}
              value={value}
            ></Slider>
          )}
        ></Controller>
        {errors.rating && <Text>This is required</Text>}
        <Text>Street</Text>
        <Controller
          control={control}
          rules={{}}
          name="street"
          render={({ field: { onChange, value } }) => (
            <View style={styles.searchContainer}>
              <GooglePlacesAutocomplete
                styles={{ textInput: styles.input }}
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  setValue(
                    "street",
                    details?.formatted_address ? details?.formatted_address : ""
                  );
                  setValue(
                    "coordinates.latitude",
                    details?.geometry.location.lat
                      ? details?.geometry.location.lat
                      : 0
                  );
                  setValue(
                    "coordinates.longitude",
                    details?.geometry.location.lng
                      ? details.geometry.location.lng
                      : 0
                  );
                }}
                query={{
                  key: "AIzaSyCGLF1exVy-jvgh6qIJaT6gVmQzRT4k4os",
                  language: "en",
                }}
              />
            </View>
          )}
        ></Controller>
        {errors.street && <Text>This is required</Text>}

        {/* Washroom Accessibility */}
        <View style={styles.traitContainer}>
          <Text>Child Friendly</Text>
          <Controller
            control={control}
            rules={{}}
            name="accessibility.childFriendly"
            render={({ field: { onChange, value } }) => (
              <Checkbox onValueChange={onChange} value={value}></Checkbox>
            )}
          ></Controller>
          {errors.accessibility?.childFriendly && <Text>This is required</Text>}
          <Text>Disability Friendly</Text>
          <Controller
            control={control}
            rules={{}}
            name="accessibility.disabilityFriendly"
            render={({ field: { onChange, value } }) => (
              <Checkbox onValueChange={onChange} value={value}></Checkbox>
            )}
          ></Controller>
          {errors.accessibility?.disabilityFriendly && (
            <Text>This is required</Text>
          )}
          <Text>Genderless Washroom</Text>
          <Controller
            control={control}
            rules={{}}
            name="accessibility.genderless"
            render={({ field: { onChange, value } }) => (
              <Checkbox onValueChange={onChange} value={value}></Checkbox>
            )}
          ></Controller>
          {errors.accessibility?.genderless && <Text>This is required</Text>}
        </View>

        <View style={styles.submit}>
          <Button title="Submit" onPress={handleSubmit(onSubmit)}></Button>
        </View>
      </View>
    </View>
  );
};

export default CreateWashroom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    position: "relative",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    maxWidth: 960,
    marginHorizontal: "auto",
    position: "relative",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    top: "28%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  traitContainer: {
    flex: 1,
    position: "absolute",
    bottom: 100,
  },
  submit: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
});
