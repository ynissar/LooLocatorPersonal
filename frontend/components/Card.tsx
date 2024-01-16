import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Touchable,
  Image,
} from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import Star from "../assets/star.png";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { convertDistance } from "geolib";
import { shortenRating, shortenAddress, shortenDistance } from "./utils";

const { width, height } = Dimensions.get("window");
export const CARD_WIDTH = width - 80;
export const CARD_INSET = 30;

interface CardProps {
  id: string;
  title: string;
  rating: number;
  genderless?: boolean;
  distanceFromUser: number;
  childFriendly?: boolean;
  disabilityFriendly?: boolean;
  address: string;
  washroomContextIndex: number;
  key: number;
  onPress: () => void;
}

const Card = ({
  id,
  title,
  rating,
  address,
  genderless,
  distanceFromUser,
  disabilityFriendly,
  childFriendly,
  washroomContextIndex,
  onPress,
}: CardProps) => {
  const route = `./washroom/${id}`;
  const router = useRouter();

  const shortenedAddress = shortenAddress(address);
  const shortenedRating = shortenRating(rating);
  const shortenedDistance = shortenDistance(distanceFromUser);
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <View style={styles.keyInfoContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
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
                <Text style={styles.distance}>{shortenedDistance}</Text>
                <View style={styles.accessibilityIcons}>
                  {genderless ? (
                    <FontAwesome5 size={18} name="genderless"></FontAwesome5>
                  ) : (
                    ""
                  )}
                  {childFriendly ? (
                    <MaterialIcons
                      size={18}
                      name="child-friendly"
                    ></MaterialIcons>
                  ) : (
                    ""
                  )}
                  {disabilityFriendly ? (
                    <MaterialCommunityIcons
                      size={18}
                      name="wheelchair-accessibility"
                    ></MaterialCommunityIcons>
                  ) : (
                    ""
                  )}
                </View>
              </View>
              <Text style={styles.address}>{shortenedAddress}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: route,
                params: { washroomContextIndex: washroomContextIndex },
              });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "white",
    width: CARD_WIDTH,
    margin: 10,
    height: 180,
    flexDirection: "column",
    borderRadius: 10,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardInfo: {
    margin: 12,
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  keyInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 18,
    height: 18,
    marginLeft: 6,
  },
  rating: {
    fontSize: 14,
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
    fontSize: 14,
    color: "#708090",
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    backgroundColor: "#FF3B30",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  accessibilityIcons: {
    flexDirection: "row",
    gap: 4,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
