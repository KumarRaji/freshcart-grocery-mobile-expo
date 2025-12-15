import { router } from 'expo-router';
import HomeScreen from '@/src/screens/HomeScreen';
import { PRODUCTS } from '@/src/constants/products';
import { useCart } from '@/src/context/CartContext';

export default function HomeTab() {
  const { addToCart, cartCount } = useCart();

  return (
    <HomeScreen
      products={PRODUCTS}
      cartCount={cartCount}
      onAddToCart={addToCart}
      onNavigateToCart={() => {
        console.log('Navigating to cart tab');
        router.push('/cart');
      }}
    />
  );
}

const styles = {};
