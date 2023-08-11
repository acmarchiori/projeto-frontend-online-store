import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/productList.css';

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
        <div className="centered-text">
          <p className="p1">NENHUM PRODUTO FOI ENCONTRADO</p>
          <p className="p2">Digite outro termo de pesquisa ou escolha uma categoria</p>
        </div>
      );
    }
    return (
      list.map((produto, index) => (
        <div key={ index } className="card">
          <Link
            data-testid="product-detail-link"
            to={ `/productDetails/${produto.id}` }
          >
            <div className="cardContent" data-testid="product">
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p className="title">{ produto.title }</p>
              <p className="price">{`R$ ${parseFloat(produto.price).toFixed(2)}`}</p>
            </div>
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
      <>
        {
          this.list()
        }
      </>
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
