import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

export default function DroneCameraFeed() {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: 'https://raspi-stream-5308758889df27.us-east1.run.app/playlist.m3u8',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onPlaybackStatusUpdate={(playbackStatus: AVPlaybackStatus) => {
          setStatus(playbackStatus);
          setIsLoading(!playbackStatus.isLoaded);
        }}
        onError={(error) => console.log('Video error:', error)}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading stream...</Text>
        </View>
      )}

      {/* Custom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            if (status.isLoaded) {
              videoRef.current?.setPositionAsync(Math.max(0, status.positionMillis - 10000));
            }
          }}
        >
          <Text style={styles.controlText}>-10s</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            if (status.isLoaded) {
              status.isPlaying 
                ? videoRef.current?.pauseAsync()
                : videoRef.current?.playAsync();
            }
          }}
        >
          <Text style={styles.controlText}>
            {status.isLoaded ? (status.isPlaying ? 'Pause' : 'Play') : 'Loading...'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            if (status.isLoaded) {
              videoRef.current?.setPositionAsync(status.positionMillis + 10000);
            }
          }}
        >
          <Text style={styles.controlText}>+10s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '80%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  controlText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});