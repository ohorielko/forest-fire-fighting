import { StyleSheet, Image, View, Platform, TouchableOpacity, TextInput, Text, Modal } from 'react-native';
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [droneModel, setDroneModel] = useState("");
  const [droneModels, setDroneModels] = useState<any[]>([]);
  const insets = useSafeAreaInsets();

  const handleAddDrone = () => {
    if (droneModel) {
      setDroneModels((prevModels) => [
        ...prevModels,
        {
          model: droneModel,
          battery: 80, // Random battery percentage
          coordinates: `<-500, 600>`, // Random coordinates
        },
      ]);
      setDroneModel(""); // Clear input field
      setModalVisible(false); // Close modal
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
    setDroneModel(""); // Clear the text input
  };

  const handleRemoveDrone = (model: string) => {
    setDroneModels((prevModels) => prevModels.filter((drone) => drone.model !== model));
  };

  return (
    <View style={{ flex: 1 }}>
        <ParallaxScrollView
      headerBackgroundColor={{ light: '#B9DABB', dark: '#353636' }}
      headerImage={


        <MaterialIcons 
            color="#3F5B41"
            name="forest" // Icon name
            size={310}         // Size of the icon
                  // Color of the icon
          />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your drones</ThemedText>
      </ThemedView>

      {/* Render a new Collapsible for each drone model */}
      {droneModels.map((drone, index) => (
        <Collapsible key={index} title={drone.model}>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Battery:</ThemedText> {drone.battery}% 🔋
          </ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Model:</ThemedText> {drone.model}
          </ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {drone.coordinates}
          </ThemedText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <ThemedText type="defaultSemiBold">
              View Camera Feed
            </ThemedText>
            <MaterialIcons name="camera-alt" size={40} color="gray" />
          </View>
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
              <TouchableOpacity style={styles.cancelButton} onPress={() => handleCloseModal()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={() => {
                handleAddDrone();
              }}>
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  floatingButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#3F5B41",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "gray",
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#3F5B41",
    padding: 10,
    marginLeft: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
