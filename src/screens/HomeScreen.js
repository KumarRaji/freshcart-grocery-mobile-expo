import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Text, TextInput } from 'react-native-paper';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ products, cartCount, onAddToCart, onNavigateToCart }) => {
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="FreshCart" subtitle="Smart grocery shopping" />
        <Appbar.Action 
          icon="cart" 
          onPress={() => {
            console.log('Cart icon clicked');
            onNavigateToCart();
          }} 
        />
        {cartCount > 0 && (
          <Text style={styles.cartBadge}>{cartCount}</Text>
        )}
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Search items"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={onAddToCart} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  cartBadge: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    minWidth: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
