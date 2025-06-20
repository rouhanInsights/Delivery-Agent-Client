import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AuthLoadingScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkLogin = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        navigation.replace('Home');
      } else {
        navigation.replace('Welcome');
      }
    };

    checkLogin();
  }, [navigation]);

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
