import React from 'react';
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({currentUser}) => (
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
                <div>
                    <Link className='option' to="/signin">SIGN IN</Link>
                    <Link className='option' to="/signup">SIGN UP</Link>
                </div>
            }
        </div>
    </div>
)

export default Header;