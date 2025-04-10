import { StyleSheet, View, Image } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { MaterialIcons } from '@expo/vector-icons';

import RealtimeStatusBar from '@/components/RealtimeStatusBar';
import InAppNotifications from '@/components/InAppNotifications';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFC9C9', dark: '#401616' }}
      headerImage={
        <MaterialIcons 
          color="#FF6B6B" 
          name="local-fire-department" // Fire icon
          size={310} 
        />
      }>
      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fire Zones</ThemedText>
      </ThemedView>

      <RealtimeStatusBar />

      <InAppNotifications maxNotifications={3} />

      {/* Display Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/forestfire.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Fire Zone 1 */}
      <Collapsible title="Fire Zone 1">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Severity:</ThemedText> High 🔥
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Location:</ThemedText> Forest Edge
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {'<-120.50, 85.75>'}
        </ThemedText>
        <View style={styles.actionRow}>
          <ThemedText style={{ marginRight: 10 }} type="defaultSemiBold">
            View Detailed Report
          </ThemedText>
          <MaterialIcons 
            name="description" 
            size={40} 
            color="gray" 
          />
        </View>
      </Collapsible>

      {/* Fire Zone 2 */}
      <Collapsible title="Fire Zone 2">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Severity:</ThemedText> Moderate 🔥
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Location:</ThemedText> Near Lake
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {'<-110.30, 92.40>'}
        </ThemedText>
        <View style={styles.actionRow}>
          <ThemedText style={{ marginRight: 10 }} type="defaultSemiBold">
            View Detailed Report
          </ThemedText>
          <MaterialIcons 
            name="description" 
            size={40} 
            color="gray" 
          />
        </View>
      </Collapsible>
    </ParallaxScrollView>
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
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 5,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
});
