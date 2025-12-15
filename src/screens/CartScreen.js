import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    Appbar,
    Button,
    Card,
    Divider,
    IconButton,
    Text,
} from 'react-native-paper';
import CheckoutScreen from './CheckoutScreen';

const CartScreen = ({ cart, updateQty, removeItem, clearCart, onNavigateToHome }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  
  const total = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    clearCart();
    setShowCheckout(false);
    onNavigateToHome();
  };

  if (showCheckout) {
    return (
      <CheckoutScreen
        cart={cart}
        total={total}
        onPlaceOrder={handlePlaceOrder}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Your Cart" />
      </Appbar.Header>

      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty.</Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`₹${item.price} x ${item.qty}`}
              left={() => (
                <Card.Cover source={{ uri: item.image }} style={styles.image} />
              )}
              right={() => (
                <View style={styles.qtyRow}>
                  <IconButton
                    icon="minus"
                    size={18}
                    onPress={() => updateQty(item.id, item.qty - 1)}
                  />
                  <Text>{item.qty}</Text>
                  <IconButton
                    icon="plus"
                    size={18}
                    onPress={() => updateQty(item.id, item.qty + 1)}
                  />
                  <IconButton
                    icon="trash-can-outline"
                    size={18}
                    onPress={() => removeItem(item.id)}
                  />
                </View>
              )}
            />
          </Card>
        )}
      />

      <View style={styles.footer}>
        <Text variant="titleMedium">Total: ₹{total.toFixed(2)}</Text>
        <Button
          mode="contained"
          disabled={cart.length === 0}
          style={styles.checkoutBtn}
          onPress={() => setShowCheckout(true)}
        >
          Checkout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    padding: 12,
  },
  card: {
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  footer: {
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutBtn: {
    marginLeft: 12,
  },
});

export default CartScreen;
