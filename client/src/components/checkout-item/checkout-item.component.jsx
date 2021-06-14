import React from 'react'
import {useDispatch} from 'react-redux'

import {clearItemFromCart, addItem, removeItem} from '../../redux/cart/cart.actions'

import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
  } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    
    const {name, imageUrl, price, quantity} = cartItem
    const dispatch = useDispatch()

    const handleRemoveClick = () => {
        dispatch(removeItem(cartItem))
    }

    const handleAddClick = () => {
        dispatch(addItem(cartItem))
    }

    const handleClearClick = () => {
        dispatch(clearItemFromCart(cartItem))
    }

    return(
        <CheckoutItemContainer> 
            <ImageContainer>
                <img src={imageUrl} alt='item' />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div className='arrow' onClick={handleRemoveClick}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={handleAddClick}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={handleClearClick}>
                &#10005;
            </RemoveButtonContainer>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem