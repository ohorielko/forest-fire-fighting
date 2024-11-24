import { StyleSheet, Image, View, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  return (
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

      <Collapsible title="Drone 1">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Battery:</ThemedText> 10% 🔋
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Model:</ThemedText> JOUAV CW-30E
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {'<-567.30, 450.46>'}
        </ThemedText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
        <ThemedText style={{ marginRight: 10 }} type="defaultSemiBold">
            View Camera Feed
          </ThemedText>
          <MaterialIcons 
            name="camera-alt" // Icon name
            size={40}         // Size of the icon
            color="gray"      // Color of the icon
          />
          
        </View>
      </Collapsible>

      <Collapsible title="Drone 2">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Battery:</ThemedText> 67% 🔋
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Model:</ThemedText> Parrot Anafi USA
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {'<123.89, 90>'}
        </ThemedText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
        <ThemedText style={{ marginRight: 10 }} type="defaultSemiBold">
            View Camera Feed
          </ThemedText>
          <MaterialIcons 
            name="camera-alt" // Icon name
            size={40}         // Size of the icon
            color="gray"      // Color of the icon
          />
          
        </View>
      </Collapsible>

      <Collapsible title="Drone 3">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Battery:</ThemedText> 100% 🔋
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Model:</ThemedText> Holybro X500 V2
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Coordinates:</ThemedText> {'<50.570, -45>'}
        </ThemedText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
        <ThemedText style={{ marginRight: 10 }} type="defaultSemiBold">
            View Camera Feed
          </ThemedText>
          <MaterialIcons 
            name="camera-alt" // Icon name
            size={40}         // Size of the icon
            color="gray"      // Color of the icon
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
});
