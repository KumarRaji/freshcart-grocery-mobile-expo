import * as React from 'react';
import { SafeAreaView } from 'react-native';
import {
    BottomNavigation,
    MD3LightTheme as DefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';

import { PRODUCTS } from './src/constants/products';
import CartScreen from './src/screens/CartScreen';
import ChatScreen from './src/screens/ChatScreen';
import HomeScreen from './src/screens/HomeScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1c77c3',   // you can match your FreshCart brand colors here
    secondary: '#f79556',
  },
};

export default function App() {
  const [cart, setCart] = React.useState([]);

  const addToCart = product => {
    console.log('addToCart called with:', product);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        console.log('Product exists, updating quantity');
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log('Adding new product to cart');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'cart', title: 'Cart', focusedIcon: 'cart' },
    { key: 'chat', title: 'Chat', focusedIcon: 'chat-processing' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => (
      <HomeScreen
        products={PRODUCTS}
        cartCount={cartCount}
        onAddToCart={addToCart}
        onNavigateToCart={() => setIndex(1)}
      />
    ),
    cart: () => (
      <CartScreen
        cart={cart}
        onUpdateQty={updateQty}
        onRemoveItem={removeItem}
      />
    ),
    chat: () => <ChatScreen />,
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}
