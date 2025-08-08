import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  Text,
  StatusBar,
  useColorScheme,
  RefreshControl,
} from 'react-native';
import OrderCard from '../components/OrderCard';
import OrderTabs from '../components/OrderTabs';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import { getHomeStyles } from '../styles/HomeStyles';

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
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';
  const styles = useMemo(() => getHomeStyles(theme), [theme]);

  const [activeTab, setActiveTab] = useState<TabType>('Assigned');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const storedId = await AsyncStorage.getItem('da_user_id');
      if (!storedId) {
        Alert.alert('Login Error', 'Delivery agent not logged in.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/orders/assigned/${storedId}`);
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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const filteredOrders = orders.filter(
    (order) => (order.status ?? '').toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={styles.statusBar.backgroundColor as string}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={styles.activity.color as string}
          />
        }
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Calcutta Fresh Foods" showProfileIcon={true} />

        <View style={styles.tabContainer}>
          <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} color={styles.activity.color as string} />
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
