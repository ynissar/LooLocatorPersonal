import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Touchable,
} from "react-native";
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../../../mapStyle";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Rating } from "@kolking/react-native-rating";

interface IWashroomCreateInput extends IWashroom {}

const CreateWashroom = () => {
  const router = useRouter();
  const [latitude, changeLatitude] = useState<number>();
  const [longitude, changeLongitude] = useState<number>();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);
  const [rating, setRating] = useState<number>(0);
  const [childFriendly, setChildFriendly] = useState<Boolean>(false);
  const [disabilityFriendly, setDisabilityFriendly] = useState<Boolean>(false);
  const [genderless, setGenderless] = useState<Boolean>(false);

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
        <Text style={styles.subtitle}>New Washroom</Text>

        <Controller
          control={control}
          rules={{ required: true }}
          name="rating"
          render={({ field: { onChange, value } }) => (
            // <Slider
            //   style={{ width: 200, height: 40 }}
            //   minimumValue={0}
            //   maximumValue={5}
            //   minimumTrackTintColor="#90e0ef"
            //   maximumTrackTintColor="#EEEEEE"
            //   onValueChange={onChange}
            //   value={value}
            // ></Slider>
            <View style={styles.rating}>
              <Rating
                size={40}
                rating={rating}
                fillColor="#FF3B30"
                onChange={(value: number) => {
                  setValue("rating", value);
                  setRating(value);
                }}
              ></Rating>
            </View>
          )}
        ></Controller>
        {errors.rating && <Text>This is required</Text>}

        {/* washroom name */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="search"
            size={18}
            style={styles.inputIcon}
          ></MaterialIcons>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Washroom Name"
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              ></TextInput>
            )}
          ></Controller>
          {errors.rating && <Text>This is required</Text>}
        </View>
        {/* washroom street */}
        <MaterialIcons
          name="location-pin"
          size={18}
          style={styles.searchIcon}
        ></MaterialIcons>
        <Controller
          control={control}
          rules={{}}
          name="street"
          render={({ field: { onChange, value } }) => (
            <View style={styles.searchContainer}>
              <GooglePlacesAutocomplete
                styles={{
                  textInput: {
                    fontSize: 16,
                    paddingVertical: 0,
                    backgroundColor: "#F6F2F4",
                    zIndex: 2,
                  },
                  row: { backgroundColor: "#F6F2F4", padding: 10, zIndex: 2 },
                  textInputContainer: { backgroundColor: "#F6F2F4", zIndex: 2 },
                  container: { flex: 0, width: "95%", zIndex: 2 },
                  description: { fontSize: 16, zIndex: 2 },
                  predefinedPlacesDescription: { zIndex: 2 },
                  poweredContainer: { backgroundColor: "#F6F2F4" },
                }}
                placeholder="Address"
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
        <View style={styles.traitsContainer}>
          <Controller
            control={control}
            rules={{}}
            name="accessibility.childFriendly"
            render={({ field: { onChange, value } }) => (
              <View style={styles.IndividualTraitContainer}>
                <Text>Child-friendly</Text>
                <Checkbox
                  style={styles.checkbox}
                  color={"#FF3B30"}
                  onValueChange={onChange}
                  value={value}
                ></Checkbox>
              </View>
            )}
          ></Controller>
          {errors.accessibility?.childFriendly && <Text>This is required</Text>}
          <Controller
            control={control}
            rules={{}}
            name="accessibility.disabilityFriendly"
            render={({ field: { onChange, value } }) => (
              <View style={styles.IndividualTraitContainer}>
                <Text>Disability-friendly</Text>
                <Checkbox
                  style={styles.checkbox}
                  color={"#FF3B30"}
                  onValueChange={onChange}
                  value={value}
                ></Checkbox>
              </View>
            )}
          ></Controller>
          {errors.accessibility?.disabilityFriendly && (
            <Text>This is required</Text>
          )}
          <Controller
            control={control}
            rules={{}}
            name="accessibility.genderless"
            render={({ field: { onChange, value } }) => (
              <View style={styles.IndividualTraitContainer}>
                <Text style={styles.traitTitle}>Genderless</Text>
                <Checkbox
                  style={styles.checkbox}
                  color={"#FF3B30"}
                  onValueChange={onChange}
                  value={value}
                ></Checkbox>
                {}
              </View>
            )}
          ></Controller>
          {errors.accessibility?.genderless && <Text>This is required</Text>}
        </View>
        {/* <View style={styles.submit}>
          <Button title="Submit" style onPress={handleSubmit(onSubmit)}></Button>
        </View> */}
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>Back to Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateWashroom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingTop: 10,
    // paddingLeft: 20,
    position: "relative",
    backgroundColor: "white",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    maxWidth: 960,
    marginHorizontal: "auto",
    position: "relative",
    marginTop: 40,
  },

  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    // fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#F6F2F4",
    marginTop: 60,
    // shadowColor: "black",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 0,
    paddingLeft: 14,
    paddingVertical: 16,
    borderRadius: 20,
    alignSelf: "center",
  },
  inputIcon: {
    marginRight: 5,
    color: "#D1CECF",
  },
  inputText: {
    fontSize: 16,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    width: "90%",
    top: "29%",
    backgroundColor: "#F6F2F4",
    fontSize: 16,
    // shadowColor: "black",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 0,
    paddingLeft: 28,
    paddingTop: 2,
    marginBottom: 0,
    paddingRight: 0,
    borderRadius: 20,
    // alignItems: "center",
    alignSelf: "center",
    zIndex: 1,
  },
  searchIcon: {
    position: "absolute",
    top: "31%",
    left: "8%",
    zIndex: 2,
    color: "#D1CECF",
  },
  rating: {
    position: "relative",
    top: "4%",
    // left: "10%",
    zIndex: 0,
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#F6F2F4",
    width: "50%",
  },
  traitsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 110,
    justifyContent: "space-around",
    paddingRight: 20,
    zIndex: 0,
  },
  traitTitle: {
    fontSize: 14,
  },
  checkbox: {
    borderColor: "#FF3B30",
  },
  IndividualTraitContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    position: "absolute",
    bottom: "20%",
    alignSelf: "center",
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderColor: "#FF3B30",
    borderWidth: 3,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: "#FF3B30", fontSize: 20 },
  submitButton: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
    width: "90%",
    height: 50,
    backgroundColor: "#FF3B30",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
