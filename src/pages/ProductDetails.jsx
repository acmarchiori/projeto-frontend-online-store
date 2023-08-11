import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByDetails } from '../services/api';
import '../styles/productDetails.css';
import Header from '../components/Header';
import ReviewsCard from '../components/ReviewsCard';

class ProductDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: 0,
    warranty: '',
    savedCart: [],
    brand: '',
    color: '',
    material: '',
    model: '',
    weight: '',
    width: '',
  };

  componentDidMount() {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));
    if (pegarLS !== null) { this.setState({ savedCart: pegarLS }); }
    this.fetchProduct();
  }

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const list = await getProductByDetails(id);
    this.setState({ title: list.title,
      thumbnail: list.pictures[0].url,
      price: list.price,
      count: 1,
      warranty: list.warranty,
      brand: list.attributes[0].value_name,
      color: list.attributes[2].value_name,
      material: list.attributes[8].value_name,
      model: list.attributes[9].value_name,
      weight: list.attributes[12].value_name,
      width: list.attributes[19].value_name });
  };

  handleClick = () => {
    const { savedCart, title, thumbnail, price, count } = this.state;
    const contador = savedCart.some((product) => product.title === title);
    if (contador) {
      this.setState(
        {
          count: 1,
        },
        () => {
          this.saveLocalStorage();
        },
      );
    } else {
      this.setState(
        { savedCart: [...savedCart, { title, thumbnail, price, count }] },
        () => { this.saveLocalStorage(); },
      );
    }
  };

  render() {
    const {
      title,
      thumbnail,
      price,
      warranty,
      brand,
      color,
      material,
      model,
      weight,
      width,
    } = this.state;

    const { match: { params: { id } } } = this.props;

    return (
      <div>
        <Header />
        <Link className="back" to="/">Voltar</Link>
        <div className="product-details-container">
          <div className="product-details-left">
            <p data-testid="product-detail-name">{title}</p>
            <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
          </div>
          <div className="product-details-right">
            <p>Especificações técnicas</p>
            <li>{`Marca: ${brand}`}</li>
            <li>{`Cor: ${color}`}</li>
            <li>{`Material: ${material}`}</li>
            <li>{`Modelo: ${model}`}</li>
            <li>{`Peso da embalagem: ${weight}`}</li>
            <li>{`Tamanho: ${width}`}</li>
            <li>{warranty}</li>
            <div className="right-footer">
              <p data-testid="product-detail-price">{`R$ ${price.toFixed(2)}`}</p>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.handleClick }
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
        <ReviewsCard productId={ id } />
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
