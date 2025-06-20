import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/OrderTabsStyles';

const tabs = ['Assigned', 'Accepted', 'Rejected', 'Delivered'] as const;

type TabType = typeof tabs[number];

interface OrderTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrderTabs;
