import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductList extends Component {
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
              <p>{ `R$ ${produto.price.toFixed(2)}` }</p>
            </li>
          </Link>
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
