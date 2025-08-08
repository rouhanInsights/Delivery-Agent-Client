import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  useColorScheme,
  StatusBar,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_BASE_URL } from '@env';
import { getDetailsStyles } from '../styles/DetailsScreenStyles';

type RootStackParamList = {
  Details: {
    orderId: number;
    slot_date: string;
    slot_details: string;
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  Home: undefined;
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface OrderItem {
  item_name: string;
  quantity: number;
  price: number;
  item_total: number;
  order_status?: string;
  remarks?: string;
}

export default function DetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { orderId, slot_date, slot_details, name, phone, address, paymentMethod } = route.params;

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';
  const styles = getDetailsStyles(theme);

  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState<string>('assigned');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrderDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/details/${orderId}`);
      const data = await response.json();

      if (response.ok && Array.isArray(data.orderDetails)) {
        setItems(data.orderDetails);
        const orderStatus = data.orderDetails[0]?.order_status;
        const orderRemarks = data.orderDetails[0]?.remarks;
        if (orderStatus) setStatus(orderStatus);
        if (orderRemarks) setRemarks(orderRemarks);
      } else {
        Alert.alert('Error', data.error || 'Failed to load order items');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not fetch order details');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const totalPrice = items.reduce((sum, item) => sum + Number(item.item_total || 0), 0);

  const handleCopyPhone = () => {
    Clipboard.setString(phone);
    Alert.alert('Copied', 'Phone number copied to clipboard');
  };

  const updateOrderStatus = async (newStatus: string, remarksText: string | null = null) => {
    setActionLoading(true);
    try {
      const bodyData: any = {
        status: newStatus,
        remarks: remarksText,
      };
      if (newStatus === 'delivered') {
        bodyData.delivered_at = new Date().toISOString();
      }

      const response = await fetch(`${API_BASE_URL}/api/orders/status/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(newStatus);
        Alert.alert('Success', `Order marked as ${newStatus}`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.error || 'Failed to update order');
      }
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Error', 'Could not update order');
    } finally {
      setActionLoading(false);
    }
  };

  const safeStatus = (status ?? '').toLowerCase();
  const displayPayment = paymentMethod?.toLowerCase() === 'cod' ? 'COD' : 'Paid';

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={styles.statusBar.backgroundColor as string}
      />

      {/* Wrapper paints the whole viewport */}
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>Order Details</Text>

          {(safeStatus === 'assigned' || safeStatus === 'accepted') && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👤 Customer Info</Text>
              <Text style={styles.text}>
                Name: <Text style={styles.bold}>{name}</Text>
              </Text>
              <TouchableOpacity onPress={handleCopyPhone}>
                <Text style={styles.text}>
                  Phone: <Text style={styles.underlinedBold}>{phone}</Text>
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                Address: <Text style={styles.link}>{address}</Text>
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Info</Text>
            <Text style={styles.text}>Order ID: #{orderId}</Text>
            <Text style={styles.text}>Slot Date: {slot_date}</Text>
            <Text style={styles.text}>Slot: {slot_details}</Text>
            <Text style={styles.text}>Payment Mode: {displayPayment}</Text>
            <Text style={styles.statusText}>
              Current Status:{' '}
              <Text
                style={[
                  styles.statusBadge,
                  safeStatus === 'rejected'
                    ? styles.statusRejected
                    : safeStatus === 'assigned'
                    ? styles.statusAssigned
                    : safeStatus === 'accepted'
                    ? styles.statusAccepted
                    : safeStatus === 'delivered'
                    ? styles.statusDelivered
                    : null,
                ]}
              >
                {(status ?? 'N/A').toUpperCase()}
              </Text>
            </Text>

            {safeStatus === 'rejected' && !!remarks && (
              <Text style={styles.text}>
                Remarks: <Text style={styles.bold}>{remarks}</Text>
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items</Text>
            {loading ? (
              <ActivityIndicator size="large" color={styles.activity.color as string} />
            ) : items.length === 0 ? (
              <Text style={styles.text}>No items found.</Text>
            ) : (
              items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={[styles.itemCol, styles.bold]}>{item.item_name}</Text>
                  <Text style={styles.itemCol}>
                    <Text style={styles.bold}>Qty: {item.quantity}</Text>
                  </Text>
                </View>
              ))
            )}
          </View>

          <Text style={styles.total}>Total: ₹ {totalPrice.toFixed(2)}</Text>

          {safeStatus === 'assigned' && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.rejectButton}
                disabled={actionLoading}
                onPress={() => setShowRejectModal(true)}
              >
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                disabled={actionLoading}
                onPress={() => updateOrderStatus('accepted')}
              >
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}

          {safeStatus === 'accepted' && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.rejectButton}
                disabled={actionLoading}
                onPress={() => setShowRejectModal(true)}
              >
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                disabled={actionLoading}
                onPress={() => updateOrderStatus('delivered')}
              >
                <Text style={styles.acceptText}>Mark as Delivered</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      <Modal
        visible={showRejectModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRejectModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowRejectModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Reject Order</Text>
                <TextInput
                  style={styles.textArea}
                  value={remarks}
                  onChangeText={setRemarks}
                  multiline
                  placeholder="Reason for rejection..."
                  placeholderTextColor={styles.placeholder.color as string}
                  selectionColor={styles.selection.color as string}
                  keyboardAppearance={theme}
                />
                <Text style={styles.warningText}>
                  Are you sure you want to reject this order?
                </Text>
                <TouchableOpacity
                  style={styles.submitButton}
                  disabled={actionLoading}
                  onPress={() => {
                    if (!remarks.trim()) {
                      Alert.alert('Validation', 'Please enter a reason.');
                      return;
                    }
                    setShowRejectModal(false);
                    updateOrderStatus('rejected', remarks);
                  }}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
