import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import facade from "./serverFacade";

import LoginInput from "./components/LoginInput";

export default App = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  getLocationAsync = async () => {
    //Request permission for users location, get the location and call this method from useEffect
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const loginHandler = async (userName, password, distance) => {
    // login and set position hooks
    try {
      await getLocationAsync();
      const result = await facade.fetchNearbyPlayers(
        userName,
        password,
        position.latitude,
        position.longitude,
        distance
      );
      // error handling? if wrong username/password
      setNearbyPlayers(result);
    } catch (err) {
      setErrorMessage("Could not get result from server");
    }
    setIsLoginMode(false);
  };

  const cancelLoginHandler = () => {
    setIsLoginMode(false);
  };

  return (
    <View style={styles.screen}>
      <Text>Teamfinder App by cph-sn233</Text>
      <Button title="Sign in" onPress={() => setIsLoginMode(true)} />
      <LoginInput
        visible={isLoginMode}
        onLogin={loginHandler}
        onCancel={cancelLoginHandler}
      />
      {/* MapView */}
      {region && (
        <MapView style={{ flex: 14 }} mapType="standard" region={region}>
          {/*MapView.Markers to show relevant positions*/}
          <MapView.Marker
            title="Your team"
            pinColor="blue"
            coordinate={{
              longitude: position.longitude,
              latitude: position.latitude,
            }}
          />
          {nearbyPlayers.map((player) => (
            <MapView.Marker
              key={player.userName}
              title={player.userName}
              pinColor="red"
              coordinate={{ longitude: player.lon, latitude: player.lat }}
            />
          ))}
        </MapView>
      )}
      {!region && (
        <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
          .. Fetching data
        </Text>
      )}
      {errorMessage && (
        <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 20 },
});
