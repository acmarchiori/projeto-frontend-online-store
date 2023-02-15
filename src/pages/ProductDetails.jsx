import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByDetails } from '../services/api';

class ProductDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: 0,
    warranty: '',
    savedCart: [],
  };

  componentDidMount() {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));

    if (pegarLS !== null) {
      this.setState({
        savedCart: pegarLS,
      });
    }
    this.fetchProduct();
  }

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const list = await getProductByDetails(id);
    this.setState({
      title: list.title,
      thumbnail: list.thumbnail,
      price: list.price,
      count: 1,
      warranty: list.warranty,
    });
  };

  handleClick = () => {
    const { savedCart, title, thumbnail, price, count } = this.state;

    const contador = savedCart.some((product) => product.title === title);
    if (contador) {
      this.setState({
        count: 1,
      });
    } else {
      this.setState({
        savedCart: [
          ...savedCart,
          {
            title,
            thumbnail,
            price,
            count,
          },
        ],
      }, this.saveLocalStorage);
    }
  };

  render() {
    const {
      title,
      thumbnail,
      price,
      warranty,
    } = this.state;

    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{`R$ ${price.toFixed(2)}`}</p>
        <p>{warranty}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao carrinho
        </button>
        <p>
          <Link
            data-testid="shopping-cart-button"
            to="/Cart"
          >
            Carrinho de compras
          </Link>
        </p>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
