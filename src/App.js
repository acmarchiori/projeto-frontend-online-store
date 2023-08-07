import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './components/Checkout';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/productDetails/:id" component={ ProductDetails } />
        <Route path="/cart" component={ Cart } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </div>
  );
}
export default App;
