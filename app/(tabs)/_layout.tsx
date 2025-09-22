import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from '../LoginScreen';  // Import the login screen


export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    setIsLoggedIn(true);  // After login, set state to true
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;  // Show login screen until logged in
  }
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="drones"
        options={{
          title: 'Drones',
          tabBarIcon: ({ color }) => <MaterialIcons name="flight" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
