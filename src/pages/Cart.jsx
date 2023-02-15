import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class Cart extends Component {
  state = {
    savedCart: [],
  };

  componentDidMount() {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));

    if (pegarLS !== null) {
      this.setState({
        savedCart: pegarLS,
      });
    }
  }

  updateCartFunction = (update) => {
    this.setState({ savedCart: update }, () => this.saveLocalStorage());
  };

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  render() {
    const {
      savedCart,
    } = this.state;

    return (
      <div>
        {
          savedCart.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (
              savedCart.map((produto, i) => (
                <ProductCard
                  key={ i }
                  title={ produto.title }
                  thumbnail={ produto.thumbnail }
                  price={ produto.price }
                  count={ produto.count }
                  load={ this.updateCartFunction }
                  savedCartTest={ savedCart }
                  saveLocalStorage={ this.saveLocalStorage }
                />
              ))
            )
        }
      </div>
    );
  }
}

Cart.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

export default Cart;
