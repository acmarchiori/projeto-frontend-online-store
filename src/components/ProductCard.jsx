import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  addItem = ({ target }) => {
    const getTitle = target.id;
    const { savedCartTest, load } = this.props;
    const newSavedCart = savedCartTest.map((product) => {
      if (product.title === getTitle) product.count += 1;

      return product;
    });
    load(newSavedCart);
  };

  decreaseItem = ({ target }) => {
    const getTitle = target.id;
    const { savedCartTest, load } = this.props;
    const newSavedCart = savedCartTest.map((product) => {
      if (product.title === getTitle) {
        if (product.count < 1) {
          product.count = 0;
        } else {
          product.count -= 1;
        }
        return product;
      }
      return product;
    });
    const removeProduct = newSavedCart.filter((productEl) => productEl.count !== 0);
    load(removeProduct);
  };

  removeItem = ({ target }) => {
    const { savedCartTest, load } = this.props;
    const removeProduct = savedCartTest
      .filter((productEl) => productEl.title !== target.id);
    load(removeProduct);
  };

  render() {
    const {
      title,
      thumbnail,
      price,
      count,
    } = this.props;

    return (
      <div>
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price.toFixed(2)}`}</p>
        <p data-testid="shopping-cart-product-quantity">
          { count }
        </p>
        <button
          data-testid="remove-product"
          onClick={ this.removeItem }
          id={ title }
        >
          Remover
        </button>
        <button
          data-testid="product-decrease-quantity"
          onClick={ this.decreaseItem }
          id={ title }
        >
          -
        </button>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.addItem }
          id={ title }
        >
          +
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
  onclickRemove: PropTypes.func,
  onclickDecrease: PropTypes.func,
  onclickIncrease: PropTypes.func,
}.isRequired;

export default ProductCard;
