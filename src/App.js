import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/productDetails/:id" component={ ProductDetails } />
        <Route path="/cart" component={ Cart } />
      </Switch>
    </div>
  );
}
export default App;
