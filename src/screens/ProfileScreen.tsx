import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileScreenStyles';
import { API_BASE_URL } from '@env';


// Define your navigation stack
type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// Define the user type
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigation = useNavigation<NavigationProp>();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (!email) {
        Alert.alert('Session Expired', 'Please log in again.');
        return navigation.replace('Login');
      }

      const response = await fetch(
  `${API_BASE_URL}/api/auth/profile/${encodeURIComponent(email)}`
);


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load profile');
      }

      setUser(data);
    } catch (err: any) {
      console.error('Profile Fetch Error:', err.message);
      Alert.alert('Error', 'Could not load profile. Please try again.');
    }
  };

  fetchProfile();
}, [navigation]); // ✅ Add navigation here


  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userEmail');
          navigation.replace('Login');
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a3c7e" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image style={styles.avatar} source={require('../assets/user.png')} />
      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email ID:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Vehicle details:</Text>
        <Text style={styles.value}>{user.vehicle}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
