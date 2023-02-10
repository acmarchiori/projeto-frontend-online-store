import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListCategories from '../components/ListCategories';
import ProductList from '../components/ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    query: '',
    queryList: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  callList = async () => {
    const { query, queryList } = this.state;
    const list = await getProductsFromCategoryAndQuery('', query);
    this.setState({ queryList: list.results });
    console.log(queryList);
    return list;
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
        <ListCategories />
        <ProductList list={ queryList } />
      </div>
    );
  }
}

export default Home;
