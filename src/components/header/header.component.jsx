import React from 'react';
import {Link} from 'react-router-dom'
<<<<<<< HEAD
import {auth} from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({currentUser}) => (
=======
import {connect} from 'react-redux'

import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../card-icon/card-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'


import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
>>>>>>> added card icon and cart dropdown
    <div className='header'>
        <Link to="/" className='logo-container' >
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/shop">
                CONTACT
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> 
                : 
                <Link className='option' to="/signin">SIGN IN</Link>
            }
<<<<<<< HEAD
        </div>
    </div>
)

export default Header;
=======
            <CartIcon/>
        </div>
        {
            hidden ? null : <CartDropdown/>
        }
    </div>
)

const mapStateToProps = ({user: {currentUser}, cart:{hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);
>>>>>>> added card icon and cart dropdown
