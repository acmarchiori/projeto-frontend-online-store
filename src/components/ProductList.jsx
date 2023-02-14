import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  state = {
    savedCart: [],
    count: 1,
  };

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  handleClick = (produto) => {
    const { savedCart, count } = this.state;
    const { title, thumbnail, price } = produto;

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

  list = () => {
    const { list } = this.props;

    if (list.length <= 0) {
      return (
        <p>Nenhum produto foi encontrado</p>
      );
    }
    return (
      list.map((produto, index) => (
        <div key={ index }>
          <Link
            data-testid="product-detail-link"
            to={ `/productDetails/${produto.id}` }
          >
            <li data-testid="product">
              <p>{ produto.title }</p>
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p>{ `R$ ${produto.price}` }</p>
            </li>
          </Link>
          <button
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => this.handleClick(produto) }
          >
            Adicionar ao carrinho
          </button>
        </div>
      )));
  };

  render() {
    return (
      <div>
        {
          this.list()
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    category_id: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.string,
  })),
}.isRequired;

export default ProductList;
