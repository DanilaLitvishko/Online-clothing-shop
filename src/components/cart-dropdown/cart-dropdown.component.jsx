import React from 'react';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../card-item/card-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-dropdown.styles.scss'

const CartDropdown = (props) => {
    
    const {cartItems, history, dispatch} = props
    
    return(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ? 
                cartItems.map(cartItem =>( 
                    <CartItem key={cartItem.id} item={cartItem}/>
                ))
                : <span className='empty-message'>Your cart is empty</span>
            } 
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
        }}
        >
            GO TO CHECKOUT
        </CustomButton>
    </div> 
)}

CartDropdown.propTypes = {
    cartItems: PropTypes.array,
    history: PropTypes.object,
    dispatch: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown)); 