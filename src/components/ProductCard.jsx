import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/productCard.css';

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
        if (product.count <= 1) {
          product.count = 1;
        } else {
          product.count -= 1;
        }
        return product;
      }
      return product;
    });
    load(newSavedCart);
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
      <div className="card-cart">
        <button
          className="remove-button"
          data-testid="remove-product"
          onClick={ this.removeItem }
          id={ title }
        >
          x
        </button>
        <img src={ thumbnail } alt={ title } className="product-image" />
        <p className="product-info" data-testid="shopping-cart-product-name">{ title }</p>
        <button
          className="quantity-button-decrease"
          data-testid="product-decrease-quantity"
          onClick={ this.decreaseItem }
          id={ title }
        >
          -
        </button>
        <p className="quantity-count" data-testid="shopping-cart-product-quantity">
          { count }
        </p>
        <button
          className="quantity-button-increase"
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.addItem }
          id={ title }
        >
          +
        </button>
        <p className="product-price">{`R$ ${parseFloat(price).toFixed(2)}`}</p>
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
