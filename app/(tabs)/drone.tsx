import { Modal, StyleSheet, TouchableOpacity, View, Dimensions, Text, Alert, FlatList } from "react-native";
import { useEffect, useState, useMemo } from 'react';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';

// Custom Icon imports
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

type Drone = {
    name: string; //only name for now
  };

export default function Drone(){
    const[status, requestPermission] = useCameraPermissions();
    const[addModalVisible, setAddModalVisible] = useState(false);
    const[cameraModalVisible, setCameraModalVisible] = useState(false);
    const[scanned, setScanned] = useState(false);

    // Drone array to store drone list
    const [drones, setDrones] = useState<Drone[]>([]); 

    //handles barcode scanning
    const handleBarCodeScanned = useMemo(() => debounce(({ type, data }) => {
        if(scanned) return;
        setScanned(true);

        try {
            const scannedDrone = JSON.parse(data);

            if(!scannedDrone.name){
                throw new Error("Invalid Json String");
            }

            //check if already in the table
            const exists = drones.some(drone => drone.name === scannedDrone.name);
            if(exists) {
                throw new Error(`Drone "${scannedDrone.name}" already exists`);
            }
            
            //no duplication error found
            setDrones(prevDrones => [...prevDrones, { name: scannedDrone.name }]);
    
            Alert.alert(
                "QR Code Scanned",
                `Added: ${scannedDrone.name}`,
                [{ text: "OK", onPress: () => 
                    setCameraModalVisible(false)
                }]
            );
        } catch (error){

            let errorMessage = "";

            if (error instanceof Error) {
                errorMessage = error.message;
              } else if (typeof error === 'string') {
                errorMessage = error;
              }

            Alert.alert(
                "Error",
                errorMessage,
                [{ text: "OK", onPress: () => setCameraModalVisible(false)}]
            )
        }

    }, 1000), [scanned]); // 1 second debounce

    //syncs with camera to show modal
    useEffect(() => {
        if (cameraModalVisible) {
            requestPermission();
        } else {
            setScanned(false);
        }
        
        return () => {
            setScanned(false); //tests
        };
    }, [cameraModalVisible]);

    return(
        <View style={styles.container}>

            {/* Page Title */}
            <SafeAreaView style={styles.safeArea}>
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>Drone List</Text>
                </View>
            </View>

            <FlatList
                data={drones}
                renderItem={({ item }) => (
                    <View style={styles.droneItem}>
                        <Text style={styles.droneName}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                <Text style={styles.emptyText}>No drones added yet. Scan a QR code to add one!</Text>
                }
                />
            
            </SafeAreaView>

            {/* button right add drone manually */}
            <TouchableOpacity 
                style={[styles.floatingButton, styles.right]}
                onPress={() => setAddModalVisible(true)}
                >
                      <Entypo name="add-to-list" size={32} color="white" />
            </TouchableOpacity>

            {/* button left camera */}
            <TouchableOpacity 
                 style={[styles.floatingButton, styles.left]}
                onPress={() => setCameraModalVisible(true)}
                >
                      <AntDesign name="qrcode" size={32} color="white" />
            </TouchableOpacity>

            {/* Camera Modal */}
            <Modal 
                visible= {cameraModalVisible} transparent animationType="slide"
                onRequestClose={() => {
                    setCameraModalVisible(false);
                    setScanned(false); // Reset for next time
                }}
                >
                
                <View style={styles.modalContainer}>
                    <View style={styles.cameraContainer}>
                        {status?.granted ? (
                        // Show camera view if permission is granted else alert 
                        <CameraView 
                                    style={styles.camera}
                                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    barcodeScannerSettings={{
                                        barcodeTypes: ['qr', 'pdf417'],
                                    }}
                                />
                            ) : (
                                <Text>Camera permission not granted</Text> //change this later
                            )}

                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={() => setCameraModalVisible(false)}
                                >
                                <AntDesign name="close" size={24} color="white" />
                            </TouchableOpacity>
                           
                    </View>
                </View>

                 
            </Modal>

        </View>
        
    );
}

const { width } = Dimensions.get('window');
const cameraSize = width * 0.8; 

const styles = StyleSheet.create({
    container: {
        flex : 1,
        position:'relative',
    },
    floatingButton: {
        position: "absolute",
        bottom: 100,
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
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
      cameraContainer: {
        width: cameraSize,
        height: cameraSize,
        borderRadius: 10,
        overflow: 'hidden', 
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      camera:{
        flex: 1,
      },
      right: {
        right: 20,
      },
      left: {
        left: 20,
      },
      safeArea: {
        flex: 1,
        backgroundColor: '#000000',
      },
    // Style for Title
      titleContainer: {
        gap: 8,
        flexDirection: 'row',
        justifyContent: "center",
      },
      headerText:{
        color: '#FFFFFF',
        fontSize: 40,
      },
    //   Style for list
      listContainer: { 
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 120, 
      },
      droneItem: {
        backgroundColor: '#2C3E50',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
      },
      droneName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      emptyText: {
        color: '#BDC3C7',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
      }
});
