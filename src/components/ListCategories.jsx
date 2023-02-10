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
    return (
      categories.map((categoria) => (
        <li key={ categoria.id }>
          <label data-testid="category" htmlFor={ categoria.name }>
            <input
              type="radio"
              name={ categoria.name }
              id={ categoria.name }
              // checked={}
              // onChange={ this.handleChange }
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

export default ListCategories;
