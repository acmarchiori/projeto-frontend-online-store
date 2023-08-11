import React, { Component } from 'react';
import PropTypes from 'prop-types';
import barcodeIcon from '../images/barcode.png';
import visaIcon from '../images/Visa.png';
import masterIcon from '../images/Master.png';
import eloIcon from '../images/Elo.png';

class PaymentMethod extends Component {
  render() {
    const { paymentMethod, handleChange } = this.props;
    return (
      <div className="paymentMethod-container">
        <div className="ticket-payment">
          <p>Boleto</p>
          <label htmlFor="boleto">
            <input
              type="radio"
              id="boleto"
              name="paymentMethod"
              value="Boleto"
              checked={ paymentMethod === 'Boleto' }
              onChange={ handleChange }
              data-testid="ticket-payment"
            />
            <img
              src={ barcodeIcon }
              alt="Boleto"
              className="payment-icon"
            />
          </label>
        </div>
        <div className="credit-payment">
          <p>Cartão de Crédito</p>
          <label htmlFor="visa">
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="Visa"
              checked={ paymentMethod === 'Visa' }
              onChange={ handleChange }
              data-testid="visa-payment"
            />
            <img
              src={ visaIcon }
              alt="Visa"
              className="payment-icon"
            />
          </label>
          <label htmlFor="mastercard">
            <input
              type="radio"
              id="mastercard"
              name="paymentMethod"
              value="MasterCard"
              checked={ paymentMethod === 'MasterCard' }
              onChange={ handleChange }
              data-testid="master-payment"
            />
            <img
              src={ masterIcon }
              alt="MasterCard"
              className="payment-icon"
            />
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              id="elo"
              name="paymentMethod"
              value="Elo"
              checked={ paymentMethod === 'Elo' }
              onChange={ handleChange }
              data-testid="elo-payment"
            />
            <img
              src={ eloIcon }
              alt="Elo"
              className="payment-icon"
            />
          </label>
        </div>
      </div>

    );
  }
}

PaymentMethod.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PaymentMethod;
