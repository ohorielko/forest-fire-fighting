import { Modal, StyleSheet, TouchableOpacity, View, Dimensions, Text, Alert } from "react-native";
import { useEffect, useState } from 'react';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom Icon imports
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function Drone(){
    const[status, requestPermission] = useCameraPermissions();
    const[addModalVisible, setAddModalVisible] = useState(false);
    const[cameraModalVisible, setCameraModalVisible] = useState(false);
    const[scanned, setScanned] = useState(false);

    //handles barcode scanning
    const handleBarCodeScanned = ({ type, data }) => {
        if(scanned) return;

        setScanned(true);
        Alert.alert(
            "QR Code Scanned",
            `Type: ${type}\nData: ${data}`,
            [{ text: "OK", onPress: () => {
                setCameraModalVisible(false);  
                }
            }]
        );
    };

    //syncs with camera to show modal
    useEffect(() => {
        if (cameraModalVisible) {
            requestPermission();
        } else {
            setScanned(false);
        }
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
                onRequestClose= {() => setCameraModalVisible(false)}
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
      titleContainer: {
        gap: 8,
        flexDirection: 'row',
        justifyContent: "center",
      },
      headerText:{
        color: '#FFFFFF',
        fontSize: 40,
      }
});