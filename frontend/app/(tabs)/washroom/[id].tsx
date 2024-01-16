import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useSearchParams, useRouter, useLocalSearchParams } from "expo-router";
import { fetchWashroom } from "../../../components/AxiosFunctions";
import { IWashroom } from "../../../types";
import { WashroomDataContext } from "../../../components/MyContext";
import Star from "../../../assets/star.png";
import {
  shortenRating,
  shortenAddress,
  shortenDistance,
} from "../../../components/utils";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const WashroomDetails = () => {
  const router = useRouter();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);

  const { id } = useSearchParams();
  const { washroomContextIndex } = useLocalSearchParams();
  const index = Number(washroomContextIndex);

  let { name, street, rating, numberOfRaters, comments, accessibility } =
    washroomsState[index];

  const { genderless, childFriendly, disabilityFriendly } = accessibility;

  comments = comments.slice(1);

  const route = `./edit/${id}`;

  console.log(washroomContextIndex);

  const shortenedRating = shortenRating(rating);
  const shortenedAddress = shortenAddress(street);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.keyInfoContainer}>
          <Text style={styles.cardTitle}>{name}</Text>
          <View style={styles.keyInfo}>
            <View style={styles.ratingInfo}>
              <Text style={styles.rating}>{shortenedRating}</Text>
              <Image style={styles.star} source={Star}></Image>
            </View>
          </View>
        </View>
        <View>
          <View>
            <View style={styles.secondInfoLine}>
              <Text style={styles.address}>{shortenedAddress}</Text>
              <View style={styles.accessibilityIcons}>
                {genderless ? (
                  <FontAwesome5 size={18} name="genderless"></FontAwesome5>
                ) : (
                  ""
                )}
                {childFriendly ? (
                  <MaterialIcons
                    size={24}
                    name="child-friendly"
                  ></MaterialIcons>
                ) : (
                  ""
                )}
                {disabilityFriendly ? (
                  <MaterialCommunityIcons
                    size={24}
                    name="wheelchair-accessibility"
                  ></MaterialCommunityIcons>
                ) : (
                  ""
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back to Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => {
              router.push({
                pathname: route,
                params: { washroomContextIndex: washroomContextIndex },
              });
            }}
          >
            <Text style={styles.commentButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.commentSectionTitle}>Reviews</Text>
          {comments.map((comment) => {
            return (
              <View style={styles.commentContainer}>
                <Text style={styles.commentName}>{comment.username}</Text>
                <Text style={styles.commentText} numberOfLines={2}>
                  {comment.comment}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );

  interface CommentProps {
    name: String;
    comment: String;
  }

  const Comment: React.FC<CommentProps> = ({ name, comment }) => {
    return (
      <View>
        <Text>{name}</Text>
        <Text>{comment}</Text>
      </View>
    );
  };

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
              params: { washroomContextIndex: washroomContextIndex },
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
    padding: 24,
    backgroundColor: "white",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    maxWidth: 960,
    marginTop: 40,
  },
  keyInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 32,
  },

  keyInfo: {
    flexDirection: "column",
  },
  ratingInfo: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    // marginRight: 2,
    backgroundColor: "#EEEFF0",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  star: {
    width: 20,
    height: 20,
    marginLeft: 6,
  },
  rating: {
    fontSize: 20,
    color: "#787E88",
    fontWeight: "bold",
  },
  secondInfoLine: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distance: {
    fontSize: 14,
    color: "#6E7780",
    fontWeight: "bold",
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    color: "#708090",
  },
  accessibilityIcons: {
    flexDirection: "row",
    gap: 4,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 10,
  },
  backButton: {
    // position: "absolute",
    // bottom: "20%",
    alignSelf: "center",
    width: "45%",
    height: 50,
    backgroundColor: "white",
    borderColor: "#FF3B30",
    borderWidth: 3,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: { color: "#FF3B30", fontSize: 16 },
  commentButton: {
    // position: "absolute",
    // bottom: "10%",
    alignSelf: "center",
    width: "45%",
    height: 50,
    backgroundColor: "#FF3B30",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  commentButtonText: {
    color: "white",
    fontSize: 16,
  },
  commentSectionTitle: {
    marginTop: 30,
    fontSize: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: "#F6F2F4",
    padding: 8,
    borderRadius: 10,
    display: "flex",
    marginBottom: 20,
  },
  commentName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,
    marginTop: 6,
  },
});
