import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import PropTypes from 'prop-types';
import '../styles/header.css';

class Header extends Component {
  handleQueryButton = () => {
    const { history, location } = this.props;

    // Verifica se o usuário não está na rota principal
    if (location.pathname !== '/') {
      history.push('/'); // Redireciona para a rota principal
    }
  };

  render() {
    const { handleChange } = this.props;
    return (
      <div className="header">
        <div className="left-side">
          <input
            data-testid="query-input"
            type="text"
            name="query"
            onChange={ handleChange }
            placeholder="Digite o que você busca 🔎"
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.handleQueryButton }
          >
            Pesquisa
          </button>
        </div>
        <div className="logo">
          <div className="logo" />
        </div>
        <div className="right-side">
          <Link data-testid="shopping-cart-button" to="/Cart">
            <IoMdCart />
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;

export default withRouter(Header);
