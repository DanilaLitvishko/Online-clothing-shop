import React, { useEffect, lazy, Suspense, useState } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import { GlobalStyle } from './global.styles'

import Header from './components/header/header.component'
import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

import { selectCurrentUser } from './redux/user/user.selectors'
import {checkUserSession} from './redux/user/user.actions'

import Chat from './components/chatroom/chat.component'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import ('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import ('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import ('./pages/checkout/checkout.component'))
const ChatPage = lazy(() => import('./pages/chat/chat.component'))

const App = () => {

  const [currentUser, setCurrentUser] = useState('')

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(checkUserSession())
  },[dispatch])

useEffect(() => {
    const verifyUser = async() =>{
      const res = await fetch('http://localhost:5000/verifyuser', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json()
      console.log(data)
      selectCurrentUser(data)
    }
    verifyUser()
  }, [])

  return (
    <div>
      <GlobalStyle/> 
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path='/' component={HomePage}/>
              <Route path='/shop' component={ShopPage}/>
              <Route exact path='/checkout' component={CheckoutPage}/>
              <Route exact path='/signin' render={() => currentUser? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>
              <Route exact path='/chat' component={ChatPage}/>
              <Route path='/chat/:id/:name' component={Chat}/>
            </Suspense>
          </ErrorBoundary>
        </Switch>
    </div>
  );
  
}

export default App;