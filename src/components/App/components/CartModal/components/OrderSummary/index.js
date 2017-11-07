import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './components/CartItem';

class OrderSummary extends Component {
  render() {
    const { cartItems } = this.props;

    if (!cartItems || cartItems.length === 0) {
      return (
        <div className="has-text-centered">
          <strong>Your bag is empty</strong>
        </div>
      );
    }

    return (
      <div className="has-text-centered">
        {cartItems.map(item => (
          <CartItem key={item.productVariant.id} item={item} />
        ))}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>
            <strong>Total</strong> ${' '}
            {cartItems
              .map(item => item.product.usdPrice * item.amount)
              .reduce((a, b) => a + b, 0)}
          </p>
          <button
            className="button is-dark"
            onClick={() => {
              this.props.loadNextPage();
            }}
          >
            Order
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps)(OrderSummary);
