import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import OrderCard from '../components/OrderCard';
import OrderTabs from '../components/OrderTabs';
import Header from '../components/Header';
import { styles } from '../styles/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';


type TabType = 'Assigned' | 'Accepted' | 'Rejected' | 'Delivered';

interface Order {
  order_id: number;
  formatted_date: string;
  slot_details: string;
  customer_name: string;
  phone: string;
  full_address: string;
  total_items: number;
  total_price: number;
  payment_method: string;
  status: string;
}

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Assigned');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedId = await AsyncStorage.getItem('da_user_id');
        if (!storedId) {
          Alert.alert('Login Error', 'Delivery agent not logged in.');
          setLoading(false);
          return;
        }

        const response = await fetch(
  `${API_BASE_URL}/api/orders/assigned/${storedId}`
);
        const data = await response.json();

        if (response.ok && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          Alert.alert('Error', data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        Alert.alert('Error', 'Could not fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
  (order) => (order.status ?? '').toLowerCase() === activeTab.toLowerCase()
);


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Calcutta Fresh Foods" showProfileIcon={true} />
        <View style={styles.tabContainer}>
          <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : filteredOrders.length === 0 ? (
          <Text style={styles.noOrdersText}>
            No {activeTab.toLowerCase()} orders.
          </Text>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.order_id}
              orderId={order.order_id}
              slot_date={order.formatted_date}
              slot_details={order.slot_details}
              name={order.customer_name}
              phone={order.phone}
              address={order.full_address}
              total_items={order.total_items}
              total_price={order.total_price}
              paymentMethod={order.payment_method}
              status={order.status}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
