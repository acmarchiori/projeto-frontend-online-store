import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { getProductByDetails } from '../services/api';
import '../styles/productDetails.css';

class ProductDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: 0,
    warranty: '',
    savedCart: [],
    reviews: [],
    email: '',
    rating: 0,
    comment: '',
    error: '',
  };

  componentDidMount() {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));
    if (pegarLS !== null) {
      this.setState({
        savedCart: pegarLS,
      });
    }
    this.fetchProduct();
    const { match: { params: { id } } } = this.props;
    const existingReviews = JSON
      .parse(localStorage.getItem(id)) || [];
    this.setState({ reviews: existingReviews });
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
        () => {
          this.saveLocalStorage();
        },
      );
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    // Validar o email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.setState({ error: 'Email inválido' });
      } else {
        this.setState({ error: '' });
      }
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { email, rating, comment } = this.state;

    // Valide os campos obrigatórios do formulário (email e rating)
    if (!email || !rating) {
      this.setState({ error: 'Campos inválidos' });
      return;
    }

    // Verifique o formato do email usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ error: 'Campos inválidos' });
      return;
    }

    // Crie um novo objeto de avaliação
    const newReview = {
      email,
      rating,
      text: comment,
    };

    // Salve a avaliação no localStorage usando apenas o id do produto como chave
    const existingReviews = JSON.parse(localStorage.getItem(id)) || [];
    const updatedReviews = [...existingReviews, newReview];
    localStorage.setItem(id, JSON.stringify(updatedReviews));

    // Atualize o estado para exibir a nova avaliação e limpar os campos do formulário
    this.setState((prevState) => ({
      reviews: [...prevState.reviews, newReview],
      email: '',
      rating: 0,
      comment: '',
      error: '',
    }));
  };

  render() {
    const {
      title,
      thumbnail,
      price,
      warranty,
      reviews,
      email,
      rating,
      comment,
      error,
    } = this.state;

    const three = 3;
    const four = 4;
    const five = 5;
    const ratingValues = [1, 2, three, four, five];

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
        <br />
        <Link data-testid="shopping-cart-button" to="/Cart">
          <IoMdCart />
        </Link>
        {/* Formulário de avaliação */}
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Seu e-mail"
            data-testid="product-detail-email"
          />
          {ratingValues.map((value) => (
            <label key={ value }>
              <input
                className="radio"
                type="radio"
                name="rating"
                value={ value }
                checked={ parseInt(rating, 10) === value }
                onChange={ this.handleChange }
                data-testid={ `${value}-rating` }
              />
              <FaStar
                className="star"
                color={ value <= parseInt(rating, 10) ? 'orange' : 'gray' }
              />
            </label>
          ))}
          <textarea
            name="comment"
            value={ comment }
            onChange={ this.handleChange }
            placeholder="Escreva sua avaliação"
            data-testid="product-detail-evaluation"
          />
          <button type="submit" data-testid="submit-review-btn">
            Enviar Avaliação
          </button>
          {error && <p data-testid="error-msg">{error}</p>}
        </form>
        {/* Avaliações existentes */}
        {reviews.map((review, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">{review.email}</p>
            <p data-testid="review-card-rating">
              Avaliação:
              {' '}
              {review.rating}
            </p>
            <p data-testid="review-card-evaluation">{review.text}</p>
          </div>
        ))}
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
