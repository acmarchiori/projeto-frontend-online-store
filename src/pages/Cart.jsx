import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class Cart extends Component {
  state = {
    savedCart: [],
  };

  componentDidMount() {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));

    if (pegarLS !== null) {
      this.setState({
        savedCart: pegarLS,
      });
    }
    // localStorage.setItem('cartSave', JSON.stringify([]));
  }

  updateCartFunction = (update) => {
    this.setState({ savedCart: update });
  };

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  // filter = (title) => {
  //   const { savedCart } = this.state;
  //   const count = savedCart.filter((produto) => produto.title === title);
  //   return count.length;
  // };

  removeItem = ({ target }) => {
    const getTitle = target.id;
    const { savedCart } = this.state;

    const verifyDeleted = savedCart.filter((produto) => produto.title !== getTitle);
    this.setState({
      savedCart: verifyDeleted,
    }, this.saveLocalStorage);
  };

  // addItem = ({ target }) => {
  //   const getTitle = target.id;
  //   const { savedCart, count } = this.state;

  //   const find = savedCart.some((produto) => produto.title === getTitle);
  //   console.log(find, !!find);
  //   if (find) {
  //     this.setState({
  //       count: (count + 1),
  //     });
  //   }
  // };

  // decreaseItem = ({ target }) => {
  //   const getTitle = target.id;
  //   const { savedCart, count } = this.state;
  //   const find = savedCart.some((produto) => produto.title === getTitle);
  //   const newSavedCart = savedCart.map((item) => {
  //     if (item.title === getTitle) {
  //       item.count -= 1;
  //       this.setState({
  //         count2: item.count,
  //       });
  //     }
  //     console.log(item.count);
  //     return item;
  //   });
  //   if (find && count < 1) {
  //     this.setState({ count: -1 });
  //     this.removeItem({ target });
  //   }
  //   this.saveLocalStorage();
  // };

  render() {
    const {
      savedCart,
    } = this.state;
    return (
      <div>
        {
          savedCart.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (
              savedCart.map((produto, i) => (
                <ProductCard
                  key={ i }
                  title={ produto.title }
                  thumbnail={ produto.thumbnail }
                  price={ produto.price }
                  onclickRemove={ this.removeItem }
                  onclickDecrease={ this.decreaseItem }
                  // onclickIncrease={ this.addItem }
                  count={ produto.count }
                  load={ this.updateCartFunction }
                />
              ))
            )
        }
      </div>
    );
  }
}

Cart.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

export default Cart;
