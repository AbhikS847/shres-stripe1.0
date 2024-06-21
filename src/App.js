import React, { useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSummary from './components/OrderSummary';
import CheckoutForm from './components/CheckoutForm';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const stripePromise = loadStripe('your-publishable-key-here');

const App = () => {
  const [amountToCharge, setAmountToCharge] = useState(0);

  const handleTotalChange = (total) => {
    setAmountToCharge(total);
  };

  return (
    <Elements stripe={stripePromise}>
      <CssBaseline />
      <Header />
      <Container style={{padding:16}}>
        <OrderSummary onTotalChange={handleTotalChange} />
        <CheckoutForm amountToCharge={amountToCharge} />
      </Container>
      <Footer />
    </Elements>
  );
};

export default App;
