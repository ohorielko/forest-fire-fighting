import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TelemetryService, TelemetryData } from "./services/TelemetryService";

export default function TelemetryScreen() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      const data = await TelemetryService.fetchTelemetry();
      setTelemetry(data);
    };
    fetchTelemetry();
  }, []);

  if (!telemetry) return <Text>Loading telemetry...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Latitude: {telemetry.lat}</Text>
      <Text>Longitude: {telemetry.lon}</Text>
      <Text>Altitude: {telemetry.alt}</Text>
      <Text>Roll: {telemetry.roll}</Text>
      <Text>Pitch: {telemetry.pitch}</Text>
      <Text>Yaw: {telemetry.yaw}</Text>
      <Text>Battery: {telemetry.battery}%</Text>
    </View>
  );
}
