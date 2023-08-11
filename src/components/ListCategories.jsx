import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';
import '../styles/listCategories.css';

class ListCategories extends Component {
  state = {
    categories: [],

  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categories: categoriesList });
  };

  list = () => {
    const { categories } = this.state;
    const { handleChange } = this.props;
    return (
      categories.map((categoria) => (
        <div key={ categoria.id }>
          <label data-testid="category" htmlFor={ categoria.name }>
            <input
              className="radio"
              type="radio"
              name={ categoria.name }
              id={ categoria.name }
              value={ categoria.id }
              onChange={ (event) => handleChange(event, categoria.id) }
            />
            { categoria.name }
          </label>
        </div>
      )));
  };

  render() {
    return (
      <div className="list">
        <h2>Categorias</h2>
        <hr />
        {
          this.list()
        }
      </div>
    );
  }
}

ListCategories.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;

export default ListCategories;
