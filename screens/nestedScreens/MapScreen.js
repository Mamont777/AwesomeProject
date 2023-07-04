import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";

export default function Map({ route }) {
  const { latitude, longitude } = route.params.location;
  const { title } = route.params;

  if (!route.params.location) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={title} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
