// components/RealtimeStatusBar.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useFireRealTimeData } from '@/services/FireRealTimeService';

interface RealtimeStatusBarProps {
  title?: string;
}

const RealtimeStatusBar: React.FC<RealtimeStatusBarProps> = ({ title = "LIVE" }) => {
  const { isUpdating, lastUpdated, refreshData } = useFireRealTimeData();

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.statusSection}>
        <View style={[styles.indicator, { backgroundColor: isUpdating ? '#FFA500' : '#00CC00' }]} />
        <ThemedText style={styles.statusText}>{title}</ThemedText>
      </View>

      <ThemedText style={styles.updatedText}>
        Last updated: {formatTime(lastUpdated)}
      </ThemedText>

      <TouchableOpacity onPress={refreshData} style={styles.refreshButton}>
        <MaterialIcons 
          name="refresh" 
          size={20} 
          color="#555" 
          style={isUpdating ? styles.rotating : undefined} 
        />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  updatedText: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  refreshButton: {
    padding: 5,
  },
  rotating: {
    transform: [{ rotate: '45deg' }],
  },
});

export default RealtimeStatusBar;