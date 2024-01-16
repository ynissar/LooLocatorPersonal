import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useSearchParams, useRouter, useLocalSearchParams } from "expo-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { WashroomDataContext } from "../../../../components/MyContext";
import {
  reviewWashroom,
  fetchWashrooms,
} from "../../../../components/AxiosFunctions";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating } from "@kolking/react-native-rating";

interface IWashroomReviewInput {
  newRating: number;
  name?: string;
  comment?: string;
}

const ReviewWashroom = () => {
  const { id } = useSearchParams();
  const { washroomContextIndex } = useLocalSearchParams();
  const router = useRouter();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);

  const [rating, setRating] = useState<number>(0);

  const index = Number(washroomContextIndex);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IWashroomReviewInput>({
    defaultValues: {
      newRating: 0,
      name: "",
      comment: "",
    },
  });

  // will be sent to database...
  const onSubmit: SubmitHandler<IWashroomReviewInput> = async (data) => {
    const { newRating, comment, name } = data;
    console.log(id, newRating, comment, name);
    await reviewWashroom({ id, newRating, comment, name });

    const washroomData = await fetchWashrooms();
    setWashrooms(washroomData.washrooms);
    console.log(washroomsState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>Add Review</Text>

        <Controller
          control={control}
          rules={{ required: true }}
          name="newRating"
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
                  setValue("newRating", value);
                  setRating(value);
                }}
              ></Rating>
            </View>
          )}
        ></Controller>
        {errors.newRating && <Text>This is required</Text>}

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="person"
            size={18}
            style={styles.inputIcon}
          ></MaterialIcons>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Your name"
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              ></TextInput>
            )}
          ></Controller>
          {errors.name && <Text>This is required</Text>}
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="comment"
            size={18}
            style={styles.inputIcon}
          ></MaterialIcons>
          <Controller
            control={control}
            rules={{ required: true }}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Comment"
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              ></TextInput>
            )}
          ></Controller>
          {errors.comment && <Text>This is required</Text>}
        </View>

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

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>review: {id}</Text>
        <Text>{washroomsState[index].name}</Text>
        <Text>{washroomsState[index].rating}</Text>
        <Text>{washroomsState[index].street}</Text>
        <Text
          onPress={() => {
            router.back();
          }}
        >
          back
        </Text>
        <View>
          {/* rating controller */}
          <Controller
            control={control}
            rules={{ required: true }}
            name="newRating"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="newRating"
                onChangeText={onChange}
                value={value}
              ></TextInput>
            )}
          ></Controller>
          {errors.newRating && <Text>This is required</Text>}
          {/* name controller */}
          <Controller
            control={control}
            rules={{ required: false }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="name"
                onChangeText={onChange}
                value={value}
              ></TextInput>
            )}
          ></Controller>
          {/* comment controller */}
          <Controller
            control={control}
            rules={{ required: false }}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="comment"
                onChangeText={onChange}
                value={value}
              ></TextInput>
            )}
          ></Controller>
          <Button title="Submit" onPress={handleSubmit(onSubmit)}></Button>
        </View>
      </View>
    </View>
  );
};

export default ReviewWashroom;

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
    marginTop: 30,
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
  rating: {
    position: "relative",
    marginTop: 30,
    marginBottom: 10,
    // top: "4%",
    // left: "10%",
    zIndex: 0,
    alignSelf: "center",
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
