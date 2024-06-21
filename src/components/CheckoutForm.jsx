import React from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CheckoutForm = ({ amountToCharge }) => {
  const stripe = useStripe();
  const elements = useElements();

  const validationSchema = Yup.object().shape({
    cardholderName: Yup.string().required('Cardholder name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    ccv: Yup.string().matches(/^[0-9]{3,4}$/, 'Invalid CCV').required('CCV is required'),
    expiryDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date').required('Expiry date is required'),
  });

  const handleSubmit = async (values, actions) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: values.cardholderName,
      },
    });

    if (error) {
      actions.setFieldError('general', error.message);
    } else {
      console.log(paymentMethod);
      // Process payment method further as needed
      // You can handle the payment confirmation or any other logic here
    }

    actions.setSubmitting(false);
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      style={{ padding: '16px', margin: '16px 0' }}
    >
      <Formik
        initialValues={{
          cardholderName: '',
          cardNumber: '',
          ccv: '',
          expiryDate: '', // Add expiryDate to initialValues
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
          <Typography variant="h5" gutterBottom>
          Payment Details
          </Typography>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                name="cardholderName"
                label="Cardholder Name"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                error={touched.cardholderName && !!errors.cardholderName}
                helperText={touched.cardholderName && errors.cardholderName}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box mb={2} display="flex">
                  <Field
                    as={TextField}
                    fullWidth
                    name="cardNumber"
                    label="Card Number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.cardNumber && !!errors.cardNumber}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box mb={2} display="flex">
                  <Field
                    as={TextField}
                    fullWidth
                    name="ccv"
                    label="CCV"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.ccv && !!errors.ccv}
                    helperText={touched.ccv && errors.ccv}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box mb={2} display="flex">
                  <Field
                    as={TextField}
                    fullWidth
                    name="expiryDate"
                    label="Expiry Date"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={touched.expiryDate && !!errors.expiryDate}
                    helperText={touched.expiryDate && errors.expiryDate}
                  />
                </Box>
              </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom>
              Amount to Charge: {amountToCharge ? `$${amountToCharge.toFixed(2)}` : ''}
            </Typography>
            {errors.general && (
              <Typography color="error" gutterBottom>
                {errors.general}
              </Typography>
            )}
            <Button className="btn-checkout" size="large" type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
              Confirm purchase
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default CheckoutForm;
