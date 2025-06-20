import React, { useState } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/RegisterStyles';
import Button from '../components/Button';
import { API_BASE_URL } from '@env';


type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
  route: RouteProp<RootStackParamList, 'Register'>;
};

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  vehicle: string;
  govtId: string;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicle: '',
    govtId: '',
  });

  const [govtIdImage, setGovtIdImage] = useState<any>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const pickImage = async () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (response.didCancel) {return;}
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image.');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setGovtIdImage(response.assets[0]);
        }
      }
    );
  };

  const handleSubmit = async () => {
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      vehicle,
      govtId,
    } = form;

    if (!fullName || !email || !phone || !password || !confirmPassword || !vehicle || !govtId) {
      return Alert.alert('Validation Error', 'Please fill in all fields.');
    }

    if (!govtIdImage) {
      return Alert.alert('Validation Error', 'Please upload your Govt ID image.');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Validation Error', 'Passwords do not match.');
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append('upload_img', {
        uri: govtIdImage.uri,
        type: 'image/jpeg',
        name: 'govtid.jpg',
      });

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Network or server error. Try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        onChangeText={(val) => handleChange('fullName', val)}
      />

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email ID"
        keyboardType="email-address"
        onChangeText={(val) => handleChange('email', val)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        onChangeText={(val) => handleChange('phone', val)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        onChangeText={(val) => handleChange('password', val)}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(val) => handleChange('confirmPassword', val)}
      />

      <Text style={styles.label}>Vehicle Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Eg: Hero Splendor Black WB-01-1234"
        onChangeText={(val) => handleChange('vehicle', val)}
      />

      <Text style={styles.label}>Government ID Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Govt ID Number"
        onChangeText={(val) => handleChange('govtId', val)}
      />

      <Text style={styles.label}>Govt Issued Verification Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.input}>
        <Text>{govtIdImage ? 'Image Selected' : '📁 Tap to Choose Image'}</Text>
      </TouchableOpacity>

      {govtIdImage && (
        <Image
          source={{ uri: govtIdImage.uri }}
          style={styles.govtIdImagePreview}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} variant="welcome" />
    </ScrollView>
  );
}
