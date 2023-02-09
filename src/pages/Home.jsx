import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" name="" id="" />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>

        <Link data-testid="shopping-cart-button" to="/Cart" >Carrinho de compras</Link>

      </div>

    );
  }
}

export default Home;
