import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { getOrderTabsStyles } from '../styles/OrderTabsStyles';

const tabs = ['Assigned', 'Accepted', 'Rejected', 'Delivered'] as const;
type TabType = typeof tabs[number];

interface OrderTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, setActiveTab }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';
  const styles = getOrderTabsStyles(theme);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, isActive && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab} tab`}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OrderTabs;
