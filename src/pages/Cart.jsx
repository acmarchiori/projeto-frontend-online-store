import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../styles/cart.css';

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
  }

  updateCartFunction = (update) => {
    this.setState({ savedCart: update }, () => this.saveLocalStorage());
  };

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  render() {
    const { savedCart } = this.state;

    // Calcula o valor total da compra somando os preços dos produtos
    const totalAmount = savedCart.reduce(
      (total, produto) => total + parseFloat(produto.price) * produto.count,
      0,
    );

    return (
      <div>
        <Header />
        <Link className="back" to="/">Voltar</Link>
        {savedCart.length === 0 ? (
          <div className="empty-container">
            <h1
              data-testid="shopping-cart-empty-message"
              className="empty-message"
            >
              Seu carrinho está vazio
            </h1>
          </div>
        ) : (
          <div className="cardBox">
            <h2>Carrinho de Compras</h2>
            {savedCart.map((produto, i) => (
              <React.Fragment key={ i }>
                <hr />
                <ProductCard
                  thumbnail={ produto.thumbnail }
                  title={ produto.title }
                  price={ produto.price }
                  count={ produto.count }
                  load={ this.updateCartFunction }
                  savedCartTest={ savedCart }
                  saveLocalStorage={ this.saveLocalStorage }
                />
              </React.Fragment>
            ))}
          </div>
        )}
        {savedCart.length > 0 && (
          <div className="checkout-cart">
            <p>
              Valor total da compra: R$
              {' '}
              {totalAmount.toFixed(2)}
            </p>
            <Link
              to="/checkout"
              data-testid="checkout-products"
              className="checkout-link"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
