import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div> 
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/hats' component={HatsPage}/>
        <Route path='/jackets' component={JacketsPage}/>
        <Route path='/sneakers' component={SneakersPage}/>
        <Route path='/womens' component={WomensPage}/>
        <Route path='/mens' component={MensPage}/>
      </Switch>
    </div>
  );
}

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

const JacketsPage = () => (
  <div>
    <h1>JACKETS PAGE</h1>
  </div>
)

const SneakersPage = () => (
  <div>
    <h1>SNEAKERS PAGE</h1>
  </div>
)

const WomensPage = () => (
  <div>
    <h1>WOMENS PAGE</h1>
  </div>
)

const MensPage = () => (
  <div>
    <h1>MENS PAGE</h1>
  </div>
)

export default App;
