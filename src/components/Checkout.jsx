import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  state = {
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
    error: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { history } = this.props;
    event.preventDefault();
    const {
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      paymentMethod,
    } = this.state;

    // Valide se todos os campos do formulário estão preenchidos
    if (!fullName || !email || !cpf || !phone || !cep || !address || !paymentMethod) {
      this.setState({ error: 'Campos inválidos' });
    } else {
      // Faça o processamento do formulário e redirecione para a tela principal
      // ...

      // Limpe o carrinho e redirecione para a página principal
      localStorage.removeItem('cartSave');
      history.push('/');
    }
  };

  render() {
    const {
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      paymentMethod,
      error,
    } = this.state;

    // Obtenha os produtos do carrinho do localStorage ou do estado da aplicação
    const cartProducts = JSON.parse(localStorage.getItem('cartSave')) || [];

    return (
      <div>
        <h1>Resumo da Compra</h1>
        <ul>
          {cartProducts.map((product) => (
            <li key={ product.title }>{product.title}</li>
          ))}
        </ul>

        <h1>Checkout</h1>
        <form onSubmit={ this.handleSubmit }>
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
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="cpf"
            value={ cpf }
            onChange={ this.handleChange }
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            name="phone"
            value={ phone }
            onChange={ this.handleChange }
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="cep"
            value={ cep }
            onChange={ this.handleChange }
            placeholder="CEP"
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="address"
            value={ address }
            onChange={ this.handleChange }
            placeholder="Endereço"
            data-testid="checkout-address"
          />
          <div>
            <input
              type="radio"
              name="paymentMethod"
              value="Boleto"
              checked={ paymentMethod === 'Boleto' }
              onChange={ this.handleChange }
              data-testid="ticket-payment"
            />
            Boleto
            <input
              type="radio"
              name="paymentMethod"
              value="Visa"
              checked={ paymentMethod === 'Visa' }
              onChange={ this.handleChange }
              data-testid="visa-payment"
            />
            Visa
            <input
              type="radio"
              name="paymentMethod"
              value="MasterCard"
              checked={ paymentMethod === 'MasterCard' }
              onChange={ this.handleChange }
              data-testid="master-payment"
            />
            MasterCard
            <input
              type="radio"
              name="paymentMethod"
              value="Elo"
              checked={ paymentMethod === 'Elo' }
              onChange={ this.handleChange }
              data-testid="elo-payment"
            />
            Elo
          </div>
          <button type="submit" data-testid="checkout-btn">
            Finalizar Compra
          </button>
          {error && <p data-testid="error-msg">{error}</p>}
        </form>
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
