import React, { useState, useEffect, useRef, useContext } from "react";
import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
} from "react-native";
import dummyMarkerData from "../../data";
import { mapStyle } from "../../mapStyle";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Card, { CARD_WIDTH, CARD_INSET } from "../../components/Card";
import { Dimensions } from "react-native";
import MapIcon from "../../assets/map_marker.png";
import { Link } from "expo-router";
import { IWashroom } from "../../types";
import { fetchWashrooms, axiosTest } from "../../components/AxiosFunctions";
import { WashroomDataContext } from "../../components/MyContext";
import lodash from "lodash";
import {getDistance, orderByDistance} from "geolib";

const DEFAULT_LATITUDE_DELTA = 0.01522;
const DEFAULT_LONGITUDE_DELTA = 0.01522;
const { width, height } = Dimensions.get("window");

interface IFilteredWashroom {
  washrooms: IWashroom[];
  distanceFromUser: number;
}


export default function App() {
  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const { washroomsState, setWashrooms } = useContext(WashroomDataContext);
  let filteredWashrooms: IFilteredWashroom[] = [];

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  let _mapView: MapView | null;
  const _scrollView: React.RefObject<ScrollView> = useRef(null);

  // brings camera to current location
  // used by current location button
  const cameraToCurrentLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: 3,
    });

    _mapView?.animateToRegion(
      {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      },
      350
    );
  };

  // adds event listener to animate camera to coordinates based on which card is in focus
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= washroomsState?.length) {
        index = washroomsState?.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      if (mapIndex != index) {
        mapIndex = index;
        const { latitude, longitude } = washroomsState[index].coordinates;
        console.log(latitude, longitude);
        _mapView?.animateCamera(
          {
            center: {
              latitude: latitude,
              longitude: longitude,
            },
          },
          { duration: 350 }
        );
      }
    });
  });

  // interpolation used to change scale of map marker based on which is currently being focused on
  const interpolations = washroomsState?.map((washroomMarker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  // runs on first mount -> saves current location in state
  useEffect(() => {
    console.log("did run");
    const fetchLocation = async () => {
      console.log("async run");
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: 3,
      });
      setLocation(currentLocation);
    };
    try {
      fetchLocation();
    } catch (error) {}
  }, []);

  useEffect(() => {
    const updateMarkers = async () => {
      const washroomData = await fetchWashrooms();
      if (!lodash.isEqual(washroomData.washrooms, washroomsState)) {
        setWashrooms(washroomData.washrooms);
        console.log(location ? "yes": "no")
        console.log("different");
        
      } else {
        console.log("same");
      }
    };
    try {
      updateMarkers();
    } catch (error) {}
  }, [washroomsState]);

  let textLocation = "Waiting...";
  if (errorMsg) {
    textLocation = errorMsg;
  } else if (location) {
    textLocation = JSON.stringify(location);
  }

  // if the marker is pressed, shifts cards until current marker's card is presented
  const onMarkerPress = (mapEventData: MarkerPressEvent, markerId: number) => {
    console.log(typeof mapEventData);
    console.log(markerId);
    let x = markerId * CARD_WIDTH + markerId * 20;
    if (Platform.OS == "ios") {
      x = x - CARD_INSET;
    }
    _scrollView.current?.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        ref={(mapView) => {
          _mapView = mapView;
        }}
        initialRegion={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        }}
        showsCompass={true}
        showsUserLocation={true}
      >
        {washroomsState?.map((washroomMarker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={washroomMarker.coordinates}
              onPress={(event) => onMarkerPress(event, index)}
            >
              <Animated.View style={styles.markerWrap}>
                <Animated.Image
                  source={MapIcon}
                  resizeMode="cover"
                  style={[styles.marker, scaleStyle]}
                ></Animated.Image>
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.currentLocationContainer}>
        <TouchableOpacity>
          <MaterialIcons
            name="crosshairs-gps"
            size={30}
            onPress={() => {
              cameraToCurrentLocation();
            }}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <View style={styles.addWashroomContainer}>
        <TouchableOpacity>
          <Link href="/washroom/new">
            <MaterialIcons name="plus" size={30}></MaterialIcons>
          </Link>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        ref={_scrollView}
        style={styles.scrollView}
        pagingEnabled={true}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width - 60}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: CARD_INSET,
          bottom: 0,
          right: CARD_INSET,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {washroomsState?.map((washroomMarker, index) => (
          <Card
            id={washroomMarker._id.toString()}
            title={washroomMarker.name}
            rating={washroomMarker.rating}
            disabilityFriendly={washroomMarker.accessibility.disabilityFriendly}
            childFriendly={washroomMarker.accessibility.childFriendly}
            genderless={washroomMarker.accessibility.genderless}
            address={washroomMarker.street}
            key={index}
            washroomIndex={index}
            onPress={() => {}}
          ></Card>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  currentLocationContainer: {
    position: "absolute",
    right: "2%",
    top: "12%",
    padding: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 50,
  },
  addWashroomContainer: {
    position: "absolute",
    left: "2%",
    top: "12%",
    padding: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 50,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 10,
  },
  View: {
    height: 100,
    width: 250,
    backgroundColor: "#444",
    marginRight: 10,
  },
  marker: {
    width: 25,
    height: 25,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
});
