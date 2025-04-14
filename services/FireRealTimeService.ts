import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { addNotification } from '@/components/InAppNotifications';

// interface for fire zone data
export interface FireZoneData {
  id: string;
  name: string;
  severity: string;
  location: string;
  coordinates: string;
  lastUpdated: Date;
}

// setup notifications
async function setupNotifications() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('Error setting up notifications:', error);
    return false;
  }
}

// send a notification (both system and in-app)
async function sendNotification(title: string, body: string) {
  try {
    // Add to in-app notifications
    addNotification(title, body);
    
    // Try to send system notification as well
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null,
    });
  } catch (error) {
    console.log('Error sending system notification:', error);
    // Make sure in-app notification still works even if system notification fails
    addNotification(title, body);
  }
}

// function to send a test notification
export async function sendTestNotification() {
  await sendNotification(
    "Test Alert",
    "This is a test alert from Forest Fire Monitor"
  );
  console.log("Test notification sent");
}

export function useFireRealTimeData() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // log notification permissions status
    Notifications.getPermissionsAsync().then(status => {
      console.log("Notification permissions status:", status);
    });

    setupNotifications();
    
    // send a test notification after 5 seconds
    setTimeout(() => {
      sendTestNotification();
    }, 5000);
    
    // Add another test notification with different content after 8 seconds
    setTimeout(() => {
      sendNotification(
        "Fire Zone 1 Update",
        "Severity has increased from Moderate to High"
      );
    }, 8000);
    
    // interval for simulating real-time updates
    const intervalId = setInterval(() => {
      // update timestamp
      setLastUpdated(new Date());
      
      // randomly decide whether to send a notification
      const shouldNotify = Math.random() > 0.7;
      if (shouldNotify) {
        // Generate a random zone number
        const zoneNum = Math.floor(Math.random() * 2) + 1;
        
        // Generate a random severity level
        const severities = ['Low', 'Moderate', 'High', 'Critical'];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        
        // simulate a severity change notification
        sendNotification(
          `Fire Zone ${zoneNum} Alert`,
          `Severity level is now ${severity} in zone ${zoneNum}.`
        );
      }
      
      // simulate "updating" state for 1 second
      setIsUpdating(true);
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
      
    }, 30000); // update every 30 seconds
    
    // clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // function to manually trigger an update and notification
  const refreshData = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setLastUpdated(new Date());
      
      // send a notification when manually refreshed
      sendNotification(
        "Data Refreshed",
        "Fire zone data has been manually updated."
      );
    }, 1000);
  };
  
  return {
    isUpdating,
    lastUpdated,
    refreshData,
    sendTestNotification
  };
}