import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import ProductCard from './ProductCard';
import StateSelect from './StateSelect';
import '../styles/checkout.css';
import PaymentMethod from './PaymentMethod';

class Checkout extends Component {
  state = { fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
    error: '',
    savedCart: [] };

  componentDidMount() {
    const pegarLS = JSON.parse(localStorage.getItem('cartSave'));
    if (pegarLS !== null) {
      this.setState({ savedCart: pegarLS });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { history } = this.props;
    event.preventDefault();
    const { fullName, email, cpf, phone, cep, address, paymentMethod } = this.state;

    // Valide se todos os campos do formulário estão preenchidos
    if (!fullName || !email || !cpf || !phone || !cep || !address || !paymentMethod) {
      this.setState({ error: 'Campos inválidos' });
    } else {
      // Limpe o carrinho e redirecione para a página principal
      localStorage.removeItem('cartSave');
      history.push('/');
    }
  };

  updateCartFunction = (update) => {
    this.setState({ savedCart: update }, () => this.saveLocalStorage());
  };

  saveLocalStorage = () => {
    const { savedCart } = this.state;
    localStorage.setItem('cartSave', JSON.stringify(savedCart) || []);
  };

  render() {
    const { fullName, email, cpf, phone, cep, address, paymentMethod, error,
      savedCart } = this.state;

    // Calcula o valor total da compra somando os preços dos produtos
    const totalAmount = savedCart.reduce(
      (total, produto) => total + parseFloat(produto.price) * produto.count,
      0,
    );

    return (
      <div>
        <Header />
        <Link className="back" to="/">Voltar</Link>
        <div className="cardBox">
          <h2>Revise seus produtos</h2>
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
          <h2>
            Total: R$
            {' '}
            {totalAmount.toFixed(2)}
          </h2>
        </div>
        <div className="right">
          <div className="info">
            <h2>Informações do comprador</h2>
          </div>
          <form onSubmit={ this.handleSubmit }>
            <div className="name-cpf">
              <input
                type="text"
                name="fullName"
                value={ fullName }
                onChange={ this.handleChange }
                placeholder="Nome Completo"
                data-testid="checkout-fullname"
              />
              <input
                type="text"
                name="cpf"
                value={ cpf }
                onChange={ this.handleChange }
                placeholder="CPF"
                data-testid="checkout-cpf"
              />
            </div>
            <div className="mail-phone">
              <input
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Email"
                data-testid="checkout-email"
              />
              <input
                type="text"
                name="phone"
                value={ phone }
                onChange={ this.handleChange }
                placeholder="Telefone"
                data-testid="checkout-phone"
              />
            </div>
            <div className="cep-address">
              <input
                type="text"
                name="cep"
                value={ cep }
                onChange={ this.handleChange }
                placeholder="CEP"
                data-testid="checkout-cep"
                className="cep"
              />
              <input
                type="text"
                name="address"
                value={ address }
                onChange={ this.handleChange }
                placeholder="Endereço"
                data-testid="checkout-address"
                className="address"
              />
            </div>
            <div className="complement-number">
              <input
                type="text"
                name="complement"
                placeholder="Complemento"
                className="complement"
              />
              <input
                type="text"
                name="number"
                placeholder="Numero"
                className="number"
              />
            </div>
            <div className="city-state">
              <input
                type="text"
                name="city"
                placeholder="Cidade"
                className="city"
              />
              <StateSelect className="state" />
            </div>
            <h2>Método de pagamento</h2>
            <PaymentMethod
              paymentMethod={ paymentMethod }
              handleChange={ this.handleChange }
            />
            <hr />
            <div className="container-button">
              <button type="submit" data-testid="checkout-btn">
                Comprar
              </button>
              {error && <p data-testid="error-msg">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
  history: PropTypes.object.isRequired, // Adicione a validação para a propriedade history
}.isRequired;

export default Checkout;
