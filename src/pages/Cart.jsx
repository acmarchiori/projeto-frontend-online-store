import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    localStorage.setItem('cartSave', JSON.stringify([]));
  }

  filter = (title) => {
    const { savedCart } = this.state;
    const count = savedCart.filter((produto) => produto.title === title);
    return count.length;
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
                <div key={ i }>

                  <p data-testid="shopping-cart-product-name">{ produto.title }</p>
                  <img src={ produto.thumbnail } alt={ produto.title } />
                  <p>{`R$ ${produto.price}`}</p>
                  <p data-testid="shopping-cart-product-quantity">
                    { `Quantidade: ${this.filter(produto.title)}` }
                  </p>
                </div>
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
