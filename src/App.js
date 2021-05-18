import React from 'react';
<<<<<<< HEAD
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import {Switch, Route} from 'react-router-dom';
=======
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import './App.css';


import HomePage from './pages/homepage/homepage.component'
>>>>>>> added card icon and cart dropdown
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
<<<<<<< HEAD
import NotFound from './pages/not-found/not-found.component'

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null 

  componentDidMount(){
=======
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
  
  unsubscribeFromAuth = null 

  componentDidMount(){
    const {setCurrentUser} = this.props
    
>>>>>>> added card icon and cart dropdown
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot=>{
<<<<<<< HEAD
          this.setState({
            currentUser:{
=======
          setCurrentUser({
            currentUser:{ 
>>>>>>> added card icon and cart dropdown
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
<<<<<<< HEAD
        this.setState({currentUser:userAuth})
=======
        setCurrentUser(userAuth)
>>>>>>> added card icon and cart dropdown
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
      return (
      <div> 
<<<<<<< HEAD
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
          <Route component={NotFound}/>
=======
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>
>>>>>>> added card icon and cart dropdown
        </Switch>
      </div>
    );
  }
}
<<<<<<< HEAD

export default App;
=======
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
>>>>>>> added card icon and cart dropdown
