/* eslint-disable */
import axios from "axios"
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51RpOeTRumF13v0mnic8aOem8Wd7XAktmJoeFjxC1ADyBVao20JLTi3d4LD92DifWidhhCm4IvXgJjsnoT57I5CTa00dPgeBpos')

export const bookTour = async tourId => {
    try{
        // 1) Get checkout session from end point of our API
    const session = await axios(
        `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })

    }
    catch{
        console.log(err);
        showAlert('error',err);
    }
}