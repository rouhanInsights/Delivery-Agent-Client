import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import styles from '../styles/ButtonStyles';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'default' | 'welcome';
};

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'default' }) => {
  const buttonStyle: StyleProp<ViewStyle> =
    variant === 'welcome' ? styles.welcomeButton : styles.button;
  const textStyle: StyleProp<TextStyle> =
    variant === 'welcome' ? styles.welcomeText : styles.buttonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
