import React from 'react';
import { View, Text, TouchableOpacity, Image, useColorScheme, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getHeaderStyles } from '../styles/HeaderStyles';

type RootStackParamList = {
  Profile: undefined;
};

interface HeaderProps {
  title: string;
  showProfileIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showProfileIcon = true }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';
  const styles = getHeaderStyles(theme);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor as string}
      />
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>

        {showProfileIcon && (
          <TouchableOpacity
            onPress={handleProfilePress}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Image
              source={require('../assets/user.png')}
              style={styles.profileImage}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
