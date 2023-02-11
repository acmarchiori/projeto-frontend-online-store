import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

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
    // console.log(categoriesList);
  };

  list = () => {
    const { categories } = this.state;
    const { handleChange } = this.props;
    return (
      categories.map((categoria) => (
        <li key={ categoria.id }>
          {/* this.setState({ id: categoria.id }) */}
          <label data-testid="category" htmlFor={ categoria.name }>
            <input
              type="radio"
              name={ categoria.name }
              id={ categoria.name }
              value={ categoria.id }
              // checked={ selectedValue === categoria.id }
              onChange={ (event) => handleChange(event, categoria.id) }
            />
            { categoria.name }
          </label>
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

ListCategories.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;

export default ListCategories;
