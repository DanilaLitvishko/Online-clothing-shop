import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import {Switch, Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import SignIn from './components/sign-in/sign-in.component'
import SignUp from './components/sign-up/sign-up.component'

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null 

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot=>{
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
        this.setState({currentUser:userAuth})
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
      return (
      <div> 
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;