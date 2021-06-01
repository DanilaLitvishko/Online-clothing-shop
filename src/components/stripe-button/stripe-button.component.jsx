import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const dotenv = require('dotenv')

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY;

    const onToken = token => {
        alert('Payment Successful')
    }

    console.log(process.env.REACT_APP_PUBLISHABLE_KEY)

    return(
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
        />
    )
}

export default StripeCheckoutButton