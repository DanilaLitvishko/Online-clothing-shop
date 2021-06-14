import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
  } from './cart-dropdown.styles';

const CartDropdown = () => {
    
    const dispatch = useDispatch()

    const history = useHistory()

    const cartItems = useSelector(selectCartItems)

    const handleDropdown = () => {
        history.push('/checkout')
        dispatch(toggleCartHidden())
    }
    
    return(
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? 
                    cartItems.map(cartItem =>( 
                        <CartItem key={cartItem.id} item={cartItem}/>
                    ))
                    : <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                } 
            </CartItemsContainer>
            <CartDropdownButton onClick={handleDropdown}>
                GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer> 
)}

export default withRouter(CartDropdown); 