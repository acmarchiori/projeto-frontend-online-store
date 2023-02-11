import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListCategories from '../components/ListCategories';
import ProductList from '../components/ProductList';
import { getProductsFromCategoryAndQuery, getProductById } from '../services/api';

class Home extends Component {
  state = {
    query: '',
    queryList: [],
    categorItem: '',

  };

  handleChange = ({ target }, categoriaId) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      categorItem: categoriaId,
    }, this.callList);
  };

  callList = async () => {
    const { categorItem, query } = this.state;
    if (query.length > 0) {
      const listCategories = await getProductsFromCategoryAndQuery('', query);
      this.setState({ queryList: listCategories.results });
      return listCategories;
    }
    const listIds = await getProductById(categorItem);
    this.setState({ queryList: listIds.results });
    return listIds;
  };

  render() {
    const { query, queryList } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="query"
          value={ query }
          id="query"
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.callList }
        >
          Pesquisa
        </button>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link data-testid="shopping-cart-button" to="/Cart">Carrinho de compras</Link>
        <ListCategories handleChange={ this.handleChange } />
        <ProductList list={ queryList } />
      </div>
    );
  }
}

export default Home;
