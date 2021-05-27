import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IspTpA4jB8HmSwEKZLkQHVaJjFxkEikHcVqiYGRDRQnlpodQslKMe7fYtKjSsXYN1NZMex1co4XTfliznye4mt200xdSLjYC5';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data:{
                amount: priceForStripe,
                token
            }
        }).then(responce => {
            alert('Payment successful')
        }).catch(error=>{
            alert('There was an issue with your payment. Please sure you use the provided credit cart')
        })
    } 

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
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton