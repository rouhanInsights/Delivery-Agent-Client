import React from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/WelcomeStyles';

// Define the navigation stack
type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.brand}>Calcutta Fresh Food</Text>
      <Image
        source={require('../assets/delivery.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Delivery Agent App</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
        variant="welcome"
      />
    </View>
  );
}
