import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  state = {
    savedCart: [],
    count2: 1,
  };

  componentDidMount() {
    this.getLocalStorage();
    const { count } = this.props;
    this.setState({
      count2: count,
    });
  }

  getLocalStorage = () => {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));
    if (pegarLS !== null) {
      this.setState({
        savedCart: pegarLS,
      });
    }
    // const find = savedCart.find((produto) => produto.title === getTitle);
    // localStorage.setItem('cartSave', JSON.stringify([]));
  };

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  addItem = ({ target }) => {
    this.getLocalStorage();
    const getTitle = target.id;
    const { savedCart } = this.state;
    const newSavedCart = savedCart.map((item) => {
      if (item.title === getTitle) {
        item.count += 1;
        this.setState({
          count2: item.count,
        });
      }
      return item;
    });
    this.setState({
      savedCart: newSavedCart,
    }, this.saveLocalStorage);
  };

  decreaseItem = ({ target }) => {
    this.getLocalStorage();
    const getTitle = target.id;
    const { savedCart } = this.state;
    const { onclickRemove } = this.props;
    const newSavedCart = savedCart.map((item) => {
      if (item.title === getTitle) {
        item.count -= 1;
        this.setState({
          count2: item.count,
        });
      }
      if (item.count < 1) {
        console.log('entrei');
        // onclickRemove({ target });
      }
      return item;
    });
    this.setState({
      savedCart: newSavedCart,
    }, this.saveLocalStorage);
  };

  // removeItem = ({ target }) => {
  //   const getTitle = target.id;
  //   const { savedCart } = this.state;

  //   const verifyDeleted = savedCart.filter((produto) => produto.title !== getTitle);
  //   this.setState({
  //     savedCart: verifyDeleted,
  //   }, this.saveLocalStorage);
  // };

  // decreaseItem = ({ target }) => {
  //   const getTitle = target.id;
  //   const { savedCart, count } = this.state;
  //   const { load, onclickRemove } = this.props;

  //   const find = savedCart.some((produto) => produto.title === getTitle);
  //   if (count < 1 || find) {
  //     onclickRemove({ target });
  //     this.setState({
  //       count: count - 1,
  //     }, this.saveLocalStorage);
  //     load(savedCart);
  //   }
  // if (!(count - 1)) {
  //   console.log('xabalu');
  //   onclickRemove({ target });
  // }
  // const newSavedCard = JSON.parse(localStorage.getItem('cartSave'));
  // if (find) {
  //   console.log('entrei');
  //   this.setState({
  //     count: (count - 1),
  //     savedCart: newSavedCard,
  //   }, this.saveLocalStorage);
  // }
  // load(savedCart);
  // };

  render() {
    const {
      title,
      thumbnail,
      price,
      onclickRemove,
      // onclickDecrease,
      // onclickIncrease,
      // count,
    } = this.props;

    const {
      count2,
    } = this.state;

    return (
      <div>
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price}`}</p>
        <p data-testid="shopping-cart-product-quantity">
          { `Quantidade: ${count2}` }
        </p>
        <button
          data-testid="remove-product"
          onClick={ onclickRemove }
          id={ title }
        >
          Remover
        </button>
        <button
          data-testid="product-decrease-quantity"
          onClick={ this.decreaseItem }
          id={ title }
        >
          -
        </button>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.addItem }
          id={ title }
        >
          +
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
  onclickRemove: PropTypes.func,
  onclickDecrease: PropTypes.func,
  onclickIncrease: PropTypes.func,
}.isRequired;

export default ProductCard;
