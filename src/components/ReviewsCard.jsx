import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

class ReviewsCard extends Component {
  state = {
    reviews: [],
    email: '',
    rating: 0,
    comment: '',
    error: '',
  };

  componentDidMount() {
    const { productId } = this.props;
    const existingReviews = JSON.parse(localStorage.getItem(productId)) || [];
    this.setState({ reviews: existingReviews });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { productId } = this.props;
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
    const newReview = { email, rating, text: comment };

    // Salve a avaliação no localStorage usando apenas o id do produto como chave
    const existingReviews = JSON.parse(localStorage.getItem(productId)) || [];
    const updatedReviews = [...existingReviews, newReview];
    localStorage.setItem(productId, JSON.stringify(updatedReviews));

    // Atualize o estado para exibir a nova avaliação e limpar os campos do formulário
    this.setState((prevState) => ({ reviews: [...prevState.reviews, newReview],
      email: '',
      rating: 0,
      comment: '',
      error: '' }));
  };

  renderStars = (rating) => {
    const five = 5;
    const starElements = [];
    for (let i = 1; i <= five; i += 1) {
      starElements.push(
        <FaStar
          key={ i }
          className="star"
          color={ i <= rating ? 'orange' : 'gray' }
        />,
      );
    }
    return starElements;
  };

  render() {
    const {
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
      <>
        <div className="center-bottom-half">
          <form onSubmit={ this.handleSubmit } className="review-form">
            <p>Avaliações</p>
            <div className="input-star">
              <input
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Seu e-mail"
                data-testid="product-detail-email"
                className="form-input"
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
            </div>
            <textarea
              name="comment"
              value={ comment }
              onChange={ this.handleChange }
              placeholder="Escreva sua avaliação"
              data-testid="product-detail-evaluation"
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              className="btn-submit"
            >
              Enviar Avaliação
            </button>
            {error && <p data-testid="error-msg" className="error-msg">{error}</p>}
          </form>
        </div>
        <hr />
        {reviews.map((review, index) => (
          <div key={ index } className="review-card">
            <div className="email-star">
              <p
                data-testid="review-card-email"
                className="review-card-email"
              >
                {review.email}
              </p>
              <span data-testid="review-card-rating" className="star">
                {this.renderStars(review.rating)}
              </span>
            </div>
            <p
              data-testid="review-card-evaluation"
              className="evaluation"
            >
              {review.text}
            </p>
            <hr />
          </div>
        ))}
      </>
    );
  }
}

ReviewsCard.propTypes = {
  productId: PropTypes.string.isRequired, // Add a prop type for productId
};

export default ReviewsCard;
