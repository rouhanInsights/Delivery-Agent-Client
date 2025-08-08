import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { getButtonStyles } from '../styles/ButtonStyles';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'default' | 'welcome';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  style,
  textStyle,
  disabled = false,
}) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';
  const styles = getButtonStyles(theme);

  const buttonStyle: StyleProp<ViewStyle> =
    variant === 'welcome' ? styles.welcomeButton : styles.button;

  const labelStyle: StyleProp<TextStyle> =
    variant === 'welcome' ? styles.welcomeText : styles.buttonText;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, disabled && styles.disabled, style]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={[labelStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
