import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: product.image }} />
      <Card.Content>
        <Text variant="titleMedium" style={styles.name}>
          {product.name}
        </Text>
        <Text variant="bodyMedium" style={styles.category}>
          {product.category}
        </Text>
        <Text variant="titleMedium" style={styles.price}>
          ₹{product.price}
        </Text>
        <Text variant="bodySmall" style={styles.desc}>
          {product.description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => {
            console.log('Add to cart pressed for:', product.name);
            onAddToCart(product);
            alert(`${product.name} added to cart!`);
          }}
          style={styles.addButton}
        >
          Add to cart
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  name: {
    marginTop: 8,
    marginBottom: 2,
  },
  category: {
    color: '#777',
    marginBottom: 4,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desc: {
    color: '#555',
  },
  addButton: {
    minHeight: 40,
    justifyContent: 'center',
  },
});

export default ProductCard;
