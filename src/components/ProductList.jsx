import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductList extends Component {
  list = () => {
    const { list } = this.props;

    if (list.length <= 0) {
      return (
        <p>Nenhum produto foi encontrado</p>
      );
    }
    return (
      list.map((produto) => (
        <li data-testid="product" key={ produto.category_id }>
          <p>{ produto.title }</p>
          <img src={ produto.thumbnail } alt={ produto.title } />
          <p>{ produto.price }</p>
        </li>
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
