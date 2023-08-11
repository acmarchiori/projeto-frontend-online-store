import React, { Component } from 'react';
import ListCategories from '../components/ListCategories';
import ProductList from '../components/ProductList';
import { getProductsFromCategoryAndQuery, getProductById } from '../services/api';
import '../styles/home.css'; // Importando o arquivo de estilos
import Header from '../components/Header';

class Home extends Component {
  state = {
    query: '',
    queryList: [],
    categorItem: '',
  };

  handleChange = ({ target }, categoriaId) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
        categorItem: categoriaId,
      },
      this.callList,
    );
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
    const isSearchEmpty = query.length === 0 && queryList.length === 0;

    return (
      <div>
        <Header handleChange={ this.handleChange } />
        <div className="list-categories-wrapper">
          <ListCategories handleChange={ this.handleChange } />
        </div>
        <div className="center">
          {isSearchEmpty ? ( // Renderização condicional com operador ternário
            <div className="centered-text">
              <p className="p1">VOCÊ AINDA NÃO REALIZOU NENHUMA BUSCA</p>
              <p className="p2" data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </div>
          ) : (
            <ProductList list={ queryList } />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
