import { router } from 'expo-router';
import CartScreen from '@/src/screens/CartScreen';
import { useCart } from '@/src/context/CartContext';

export default function CartTab() {
  const { cart, updateQty, removeItem, clearCart } = useCart();

  return (
    <CartScreen
      cart={cart}
      updateQty={updateQty}
      removeItem={removeItem}
      clearCart={clearCart}
      onNavigateToHome={() => router.push('/')}
    />
  );
}