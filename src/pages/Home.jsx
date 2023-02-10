import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListCategories from '../components/ListCategories';

class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" name="" id="" />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link data-testid="shopping-cart-button" to="/Cart">Carrinho de compras</Link>
        <ListCategories />
      </div>
    );
  }
}

export default Home;
