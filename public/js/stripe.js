/* eslint-disable */
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51QmsppAn8VEQ4fbY8Zq2UoBsXNbNfhFS8DyMJMjRCA6XbZ1AsuRdAbNoKCPuxrliTPDTIWU1lIyKbctlhAyM0y7E00sRy8FJ5F'
);
export const bookTour = async tourId => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
  }
};
