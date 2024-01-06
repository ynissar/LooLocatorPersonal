import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useContext } from "react";
import { useSearchParams, useRouter, useLocalSearchParams } from "expo-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { WashroomDataContext } from "../../../../components/MyContext";
import {
  reviewWashroom,
  fetchWashrooms,
} from "../../../../components/AxiosFunctions";

interface IWashroomReviewInput {
  newRating: number;
  name?: string;
  comment?: string;
}

const ReviewWashroom = () => {
  const { id } = useSearchParams();
  const { washroomIndex } = useLocalSearchParams();
  const router = useRouter();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);

  const index = Number(washroomIndex);

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
