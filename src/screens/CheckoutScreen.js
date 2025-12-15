import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Divider,
  Text,
  TextInput,
} from 'react-native-paper';

const CheckoutScreen = ({ cart, total, onPlaceOrder, onBack }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address.trim() || !phone.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      onPlaceOrder();
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Checkout" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="Order Summary" />
          <Card.Content>
            {cart.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <Text>{item.name} x {item.qty}</Text>
                <Text>₹{(item.price * item.qty).toFixed(2)}</Text>
              </View>
            ))}
            <Divider style={styles.divider} />
            <View style={styles.totalRow}>
              <Text variant="titleMedium">Total: ₹{total.toFixed(2)}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Delivery Details" />
          <Card.Content>
            <TextInput
              label="Delivery Address"
              value={address}
              onChangeText={setAddress}
              mode="outlined"
              multiline
              style={styles.input}
            />
            <TextInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handlePlaceOrder}
          loading={loading}
          disabled={loading}
          style={styles.placeOrderBtn}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 12 },
  card: { marginBottom: 12 },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  divider: { marginVertical: 8 },
  totalRow: {
    alignItems: 'flex-end',
  },
  input: { marginBottom: 12 },
  footer: {
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  placeOrderBtn: { width: '100%' },
});

export default CheckoutScreen;