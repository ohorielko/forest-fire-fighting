import { StyleSheet, View, TouchableOpacity, TextInput, Text, Modal } from 'react-native';
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function TabTwoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [droneModel, setDroneModel] = useState("");
  const [droneModels, setDroneModels] = useState<any[]>([]);

  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();

  // Fetch drone data from Firestore
  const fetchDrone = async () => {
    const docRef = doc(db, "telemdata", "drone123");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setDroneModels([{
        model: data.droneId,
        battery: data.battery,
        coordinates: `<${data.lat}, ${data.lon}>`,
        alt: data.alt,
        pitch: data.pitch,
        roll: data.roll,
        yaw: data.yaw,
        timestamp: data.timestamp?.toDate().toLocaleString(),
      }]);
    } else {
      console.log("No such drone!");
    }
  };

  // Load drone on mount
  useEffect(() => {
    fetchDrone();
  }, []);

  const handleAddDrone = () => {
    if (droneModel) {
      setDroneModels((prevModels) => [
        ...prevModels,
        {
          model: droneModel,
          battery: 80,
          coordinates: `<-500, 600>`,
          alt: 0,
          pitch: 0,
          roll: 0,
          yaw: 0,
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setDroneModel("");
      setModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setDroneModel("");
  };

  const handleRemoveDrone = (model: string) => {
    setDroneModels((prevModels) => prevModels.filter((drone) => drone.model !== model));
  };

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#B9DABB', dark: '#353636' }}
        headerImage={<MaterialIcons color="#3F5B41" name="forest" size={310} />}
      >
        <ThemedView style={[styles.titleContainer, { justifyContent: 'space-between', alignItems: 'center' }]}>
          <ThemedText type="title">Your drones</ThemedText>

          {/* Refresh button */}
          <TouchableOpacity onPress={fetchDrone} style={styles.refreshButton}>
            <MaterialIcons name="refresh" size={28} color="#3F5B41" />
          </TouchableOpacity>
        </ThemedView>

        {droneModels.map((drone, index) => (
          <Collapsible key={index} title={drone.model}>
            <ThemedText><ThemedText type="defaultSemiBold">Battery:</ThemedText> {drone.battery}% 🔋</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Model:</ThemedText> {drone.model}</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {drone.coordinates}</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Altitude:</ThemedText> {drone.alt} m</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Pitch:</ThemedText> {drone.pitch}°</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Roll:</ThemedText> {drone.roll}°</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Yaw:</ThemedText> {drone.yaw}°</ThemedText>
            <ThemedText><ThemedText type="defaultSemiBold">Last Update:</ThemedText> {drone.timestamp}</ThemedText>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
              onPress={() => navigation.navigate("DroneCameraFeed")}
            >
              <ThemedText type="defaultSemiBold">View Camera Feed</ThemedText>
              <MaterialIcons name="camera-alt" size={40} color="gray" />
            </TouchableOpacity>

            <ThemedText
              style={{ color: 'red', fontSize: 14, marginTop: 10 }}
              onPress={() => handleRemoveDrone(drone.model)}
            >
              Remove Drone
            </ThemedText>
          </Collapsible>
        ))}
      </ParallaxScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Drone Model</Text>
            <TextInput
              style={styles.input}
              placeholder="Drone Model Name"
              placeholderTextColor="#888"
              value={droneModel}
              onChangeText={setDroneModel}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAddDrone}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: { flexDirection: 'row', gap: 8 },
  refreshButton: { padding: 4, marginLeft: 8 },
  floatingButton: {
    position: "absolute", bottom: 100, right: 20, backgroundColor: "#3F5B41",
    width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5,
  },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "80%", backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  cancelButton: { flex: 1, backgroundColor: "gray", padding: 10, marginRight: 5, borderRadius: 5, alignItems: "center" },
  addButton: { flex: 1, backgroundColor: "#3F5B41", padding: 10, marginLeft: 5, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});