import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByDetails } from '../services/api';

class ProductDetails extends Component {
  state = {
    title: '',
    image: '',
    price: 0,
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    const list = await getProductByDetails(id);
    this.setState({
      title: list.title,
      image: list.thumbnail,
      price: list.price,
    });
  };

  render() {
    const {
      title,
      image,
      price,
    } = this.state;

    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          <h1 data-testid="product-detail-name">{ title }</h1>
          <img data-testid="product-detail-image" src={ image } alt={ title } />
          <p data-testid="product-detail-price">{`R$ ${price.toFixed(2)}`}</p>
        </Link>
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
