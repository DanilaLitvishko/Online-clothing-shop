import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
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

const CartDropdown = (props) => {
    
    const dispatch = useDispatch()

    const {history} = props

    const cartItems = useSelector(selectCartItems)
    
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
            <CartDropdownButton onClick={() => {
                history.push('/checkout')
                dispatch(toggleCartHidden())
            }}
            >
                GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer> 
)}

CartDropdown.propTypes = {
    cartItems: PropTypes.array,
    history: PropTypes.object,
    dispatch: PropTypes.func
}

export default withRouter(CartDropdown); 