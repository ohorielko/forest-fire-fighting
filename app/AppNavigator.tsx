import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabTwoScreen from "./(tabs)/drones";
import DroneCameraScreen from "./DroneCameraFeed";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drones" component={TabTwoScreen} />
      <Stack.Screen name="DroneCamera" component={DroneCameraScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
