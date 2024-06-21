// ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Box, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductList = ({ setItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProductToCart = (product) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        name: product.title,
        price: product.price,
        id: product.id,
      },
    ]);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Available Products
      </Typography>
      {products.map((product) => (
        <Paper key={product.id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <IconButton
              size="small"
              color="primary"
              aria-label="Add to Cart"
              onClick={() => addProductToCart(product)}
            >
              Add to Cart
            </IconButton>
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default ProductList;
