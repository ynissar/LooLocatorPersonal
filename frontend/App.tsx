import React, { useState, useEffect, useRef } from "react";
import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  GestureResponderEvent,
  Platform,
} from "react-native";
import dummyMarkerData from "./data";
import { mapStyle } from "./mapStyle";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Card from "./components/Card";
import { Dimensions } from "react-native";
import MapIcon from "./assets/map_marker.png";

const DEFAULT_LATITUDE_DELTA = 0.01522;
const DEFAULT_LONGITUDE_DELTA = 0.01522;
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const CARD_HEIGHT = 220;

export default function App() {
  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / (width - 80) + 0.3);
      if (index >= dummyMarkerData.length) {
        index = dummyMarkerData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      if (mapIndex != index) {
        mapIndex = index;
        const { latitude, longitude } = dummyMarkerData[index].coordinates;
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

  const interpolations = dummyMarkerData.map((washroomMarker, index) => {
    const inputRange = [
      (index - 1) * (width - 80),
      index * (width - 80),
      (index + 1) * (width - 80),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

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

  let textLocation = "Waiting...";
  if (errorMsg) {
    textLocation = errorMsg;
  } else if (location) {
    textLocation = JSON.stringify(location);
  }

  let _mapView: MapView | null;
  const _scrollView: React.RefObject<ScrollView> = useRef(null);

  const onMarkerPress = (mapEventData: MarkerPressEvent, markerId: number) => {
    console.log(typeof mapEventData);
    console.log(markerId);
    // const markerId = mapEventData._targetInst.return.key;
    // console.log(markerId);
    let x = markerId * (width - 80) + markerId * 20;
    if (Platform.OS == "ios") {
      x = x - 30;
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
          //   // latitudeDelta: 0.1122,
          //   // longitudeDelta: 0.1122,
        }}
        showsCompass={true}
        showsUserLocation={true}
        // showsMyLocationButton={true}

        // onRegionChangeComplete={() => cameraToCurrentLocation()}
      >
        {dummyMarkerData.map((washroomMarker, index) => {
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
              title={washroomMarker.name}
              description={washroomMarker.description}
              onPress={(event) => onMarkerPress(event, index)}
            >
              <Animated.View style={styles.markerWrap}>
                {/* <Text>Hello</Text> */}
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
      <View style={styles.buttonContainer}>
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
      {/* <Animated.ScrollView
        horizontal={true}
        decelerationRate={0}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        // pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        // contentContainerStyle:
      >
        {dummyMarkerData.map((washroomMarker, index) => (
          <Card
            title={washroomMarker.name}
            description={washroomMarker.description}
            accessible={washroomMarker.accessibleWashroom}
            address={washroomMarker.street}
            key={index}
            onPress={() => {}}
          ></Card>
        ))}
      </Animated.ScrollView> */}

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
          left: 30,
          bottom: 0,
          right: 30,
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
        {dummyMarkerData.map((washroomMarker, index) => (
          <Card
            id={index}
            title={washroomMarker.name}
            description={washroomMarker.description}
            accessible={washroomMarker.accessibleWashroom}
            address={washroomMarker.street}
            key={index}
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
  buttonContainer: {
    position: "absolute",
    right: "2%",
    top: "12%",
    padding: 8,
    backgroundColor: "#f8f8f8",
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
    width: 30,
    height: 30,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
});
