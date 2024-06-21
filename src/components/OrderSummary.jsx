import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderSummary = ({ onTotalChange }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const randomProducts = getRandomProducts(response.data, 3); // Get 3 random products
        setItems(randomProducts);
        calculateTotal(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalPrice);
    onTotalChange(totalPrice); // Notify parent component (App.js) of the total amount
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>
      {items.map((item, index) => (
        <Paper key={item.id} elevation={3} style={{ padding: '12px', marginBottom: '12px' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="body1">
              {item.title} - ${item.price.toFixed(2)}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                size="small"
                aria-label="Delete"
                onClick={() => removeItem(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
      <Divider style={{ margin: '12px 0' }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Total:</Typography>
        <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
