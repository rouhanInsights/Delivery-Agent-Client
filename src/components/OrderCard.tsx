import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/OrderCardStyles';
import Button from './Button';

interface OrderCardProps {
  orderId: number;
  slot_date: string;
  slot_details: string;
  name: string;
  phone: string;
  address: string;
  total_items: number;
  total_price: number;
  paymentMethod: string;
  status: string;
}

type RootStackParamList = {
  Details: OrderCardProps;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  slot_date,
  slot_details,
  name,
  phone,
  address,
  total_items,
  total_price,
  paymentMethod,
  status,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isCOD = paymentMethod?.toLowerCase() === 'cod';
  const displayPayment = isCOD ? 'COD' : 'Paid';
  const isAddressVisible = status !== 'rejected' && status !== 'delivered';

  const handleViewDetails = () => {
    navigation.navigate('Details', {
      orderId,
      slot_date,
      slot_details,
      name,
      phone,
      address,
      total_items,
      total_price,
      paymentMethod,
      status,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>#ORD{orderId}</Text>

        <View style={[styles.badge, isCOD ? styles.cod : styles.prepaid]}>
          <Text style={styles.badgeText}>{displayPayment}</Text>
        </View>
      </View>

      <Text style={styles.date}>
        {slot_date} | Slot: {slot_details}
      </Text>
      {status !== 'rejected' && status !== 'delivered' && (
  <Text style={styles.name}>{name}</Text>
)}

      {isAddressVisible && <Text style={styles.address}>{address}</Text>}
      <Text style={styles.items}>
        {total_items} Items <Text style={styles.price}>Rs {total_price}</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="View Details" onPress={handleViewDetails} />
      </View>
    </View>
  );
};

export default OrderCard;
