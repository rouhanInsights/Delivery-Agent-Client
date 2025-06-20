import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/HeaderStyles';

type RootStackParamList = {
  Profile: undefined;
};

interface HeaderProps {
  title: string;
  showProfileIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showProfileIcon = true }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {showProfileIcon && (
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require('../assets/user.png')}
            style={styles.profileImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
