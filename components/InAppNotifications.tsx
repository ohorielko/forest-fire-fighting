import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';

// interface for notification items
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// props for the InAppNotifications component
interface InAppNotificationsProps {
  maxNotifications?: number;
}

// global notification storage
let notificationStorage: NotificationItem[] = [];

// function to add a new notification
export function addNotification(title: string, message: string) {
  const newNotification: NotificationItem = {
    id: Date.now().toString(),
    title,
    message,
    timestamp: new Date(),
    read: false,
  };
  
  notificationStorage = [newNotification, ...notificationStorage];
  
  // keep only the most recent notifications
  if (notificationStorage.length > 10) {
    notificationStorage = notificationStorage.slice(0, 10);
  }
  
  // return the new notification
  return newNotification;
}

const InAppNotifications: React.FC<InAppNotificationsProps> = ({ 
  maxNotifications = 3 
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  
  // Update notifications from storage
  useEffect(() => {

    const updateNotifications = () => {
      setNotifications([...notificationStorage]);
    };
    
    // initial update
    updateNotifications();
    
    // interval to check for new notifications
    const intervalId = setInterval(updateNotifications, 2000);
    
    // cleanup
    return () => clearInterval(intervalId);
  }, []);
  
  // handle animation when expanded state changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expanded, slideAnim]);
  
  // mark a notification as read
  const markAsRead = (id: string) => {
    notificationStorage = notificationStorage.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications([...notificationStorage]);
  };
  
  // clear all notifications
  const clearAllNotifications = () => {
    notificationStorage = [];
    setNotifications([]);
  };
  
  // count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // display notifications based on expanded state
  const displayedNotifications = expanded
    ? notifications
    : notifications.slice(0, maxNotifications);
  
  // skip rendering if no notifications
  if (notifications.length === 0) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.titleContainer}>
          <MaterialIcons name="notifications" size={20} color="#FF6B6B" />
          <ThemedText style={styles.title}>Recent Alerts</ThemedText>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>{unreadCount}</ThemedText>
            </View>
          )}
        </View>
        <View style={styles.headerButtons}>
          {notifications.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={clearAllNotifications}
            >
              <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
            </TouchableOpacity>
          )}
          <MaterialIcons 
            name={expanded ? "expand-less" : "expand-more"} 
            size={24} 
            color="gray" 
          />
        </View>
      </TouchableOpacity>
      
      <Animated.View style={[
        styles.notificationsContainer,
        { maxHeight: expanded ? 300 : 150 }
      ]}>
        {displayedNotifications.length > 0 ? (
          displayedNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                notification.read ? styles.notificationRead : styles.notificationUnread
              ]}
              onPress={() => markAsRead(notification.id)}
            >
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationTitle}>
                  {notification.title}
                </ThemedText>
                <ThemedText style={styles.notificationTime}>
                  {formatTime(notification.timestamp)}
                </ThemedText>
              </View>
              <ThemedText style={styles.notificationMessage}>
                {notification.message}
              </ThemedText>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText style={styles.emptyText}>No notifications</ThemedText>
        )}
        
        {!expanded && notifications.length > maxNotifications && (
          <TouchableOpacity 
            style={styles.showMoreButton} 
            onPress={() => setExpanded(true)}
          >
            <ThemedText style={styles.showMoreText}>
              Show {notifications.length - maxNotifications} more...
            </ThemedText>
          </TouchableOpacity>
        )}
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  badge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    marginRight: 8,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  notificationsContainer: {
    overflow: 'hidden',
  },
  notificationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  notificationUnread: {
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  notificationRead: {
    backgroundColor: 'transparent',
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
    color: 'gray',
  },
  notificationMessage: {
    fontSize: 13,
  },
  showMoreButton: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  showMoreText: {
    fontSize: 12,
    color: 'gray',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default InAppNotifications;