import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_BASE_URL } from '@env';
import styles from '../styles/LoginStyles';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Validation Error', 'Please enter email and password.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok && data.user?.user_id) {
        await AsyncStorage.setItem('da_user_id', String(data.user.user_id));
        await AsyncStorage.setItem('userEmail', data.user.email);
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      console.error('Login Error:', err.message);
      Alert.alert('Error', 'Network or server error');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#ffffff' },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? '#e0e0e0' : '#1f6f34' }]}>
        Login
      </Text>

      <TextInput
        placeholder="Email ID"
        placeholderTextColor={isDark ? '#9aa0a6' : '#666666'}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#f2f2f2',
            color: isDark ? '#ffffff' : '#000000',
            borderColor: isDark ? '#2a2a2a' : 'transparent',
          },
        ]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? '#9aa0a6' : '#666666'}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#f2f2f2',
            color: isDark ? '#ffffff' : '#000000',
            borderColor: isDark ? '#2a2a2a' : 'transparent',
          },
        ]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? '#2e7d32' : '#1f6f34' },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.footerText,
          { color: isDark ? '#cfcfcf' : '#444444' },
        ]}
      >
        Don’t have an account?{' '}
        <Text
          style={[
            styles.link,
            { color: isDark ? '#4dabf7' : '#007bff' },
          ]}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}
