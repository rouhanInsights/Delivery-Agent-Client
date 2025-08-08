import React from 'react';
import { View, Text, Image, useColorScheme, StatusBar } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getWelcomeStyles } from '../styles/WelcomeStyles';

// Define the navigation stack
type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const scheme = useColorScheme();
  const styles = getWelcomeStyles(scheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={styles.statusBar.backgroundColor as string}
      />

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.brand}>Calcutta Fresh Food</Text>

      <Image
        source={require('../assets/delivery.png')}
        style={styles.image}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      <Text style={styles.subtitle}>Delivery Agent App</Text>

      <View style={styles.ctaWrap}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Login')}
          variant="welcome"
          // If your Button supports style/pressableStyle/textStyle props,
          // you can pass these for perfect theming:
          // style={styles.button}
          // textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}
