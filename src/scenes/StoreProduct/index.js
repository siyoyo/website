import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import _ from 'lodash';
import Spinner from '../../components/Spinner';
import { ADD_ITEM_TO_CART } from '../../config/actionTypes';

const SIZES_ORDER = {
  XS: 0,
  S: 1,
  M: 2,
  L: 3,
  XL: 4,
  XXL: 5,
};

class StoreProduct extends Component {
  state = {
    isModalOpen: false,
    selectedQuantity: {
      value: 1,
      label: 1,
    },
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.data.Product || this.state.selectedProductVariant) return;

    const firstProductVariant = _.find(
      newProps.data.Product.productVariants,
      pv => pv.size === 'XS',
    );

    this.setState({
      selectedProductVariant: {
        value: firstProductVariant,
        label: firstProductVariant.size,
      },
    });
  }

  handleQuantityChange = selectedQuantity => {
    this.setState({
      selectedQuantity,
    });
  };

  handleProductVariantChange = selectedProductVariant => {
    this.setState({
      selectedProductVariant,
    });
  };

  addItemToCart = () => {
    const item = {
      amount: this.state.selectedQuantity.value,
      product: this.props.data.Product,
      productVariant: this.state.selectedProductVariant.value,
    };

    this.props.onAdd(item);
  };

  renderProduct(product) {
    const sortedProductVariants = []
      .concat(product.productVariants)
      .sort((pv1, pv2) => SIZES_ORDER[pv1.size] > SIZES_ORDER[pv2.size])
      .map(pv => ({
        value: pv,
        label: pv.size,
      }));

    const isItemInCart =
      this.state.selectedProductVariant &&
      _.find(
        _.map(this.props.cartItems, i => i.productVariant.id),
        productVariantId =>
          productVariantId === this.state.selectedProductVariant.value.id,
      );

    return (
      <div>
        <h2 className="is-size-2">{product.name}</h2>
        <br />
        <div className="columns is-centered">
          <div className="column is-half">
            <figure
              className="image"
              style={{ maxWidth: '70%', margin: 'auto' }}
            >
              <img src={product.imageUrl} alt="" />
            </figure>
          </div>
          <div
            className="column is-half"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p className="is-size-3">$ {product.usdPrice}</p>
            <br />
            <div className="field">
              <label className="label" style={{ color: '#fafafa' }}>
                Select your size
              </label>
              <div className="control">
                <Select
                  className="centered"
                  placeholder="Size"
                  searchable={false}
                  clearable={false}
                  value={this.state.selectedProductVariant}
                  options={sortedProductVariants}
                  onChange={this.handleProductVariantChange}
                />
              </div>
            </div>
            <br />
            <div className="field">
              <label className="label" style={{ color: '#fafafa' }}>
                Quantity
              </label>
              <div className="control">
                <Select
                  className="centered"
                  placeholder="Size"
                  searchable={false}
                  clearable={false}
                  value={this.state.selectedQuantity}
                  options={_.range(1, 11).map(n => ({
                    value: n,
                    label: n,
                  }))}
                  onChange={this.handleQuantityChange}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="field">
              <div className="control has-text-centered">
                {isItemInCart ? (
                  <p>This product has been added to your bag</p>
                ) : (
                  <button
                    disabled={!this.state.selectedProductVariant}
                    className="button"
                    onClick={this.addItemToCart}
                  >
                    Add to bag
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.data.loading) {
      return <Spinner />;
    }

    if (this.props.error || !this.props.data.Product) {
      return (
        <section
          className="container has-text-centered"
          style={{ padding: '4rem 0' }}
        >
          <h4 className="is-size-4">
            An error occured fetching this Swag Store product...
          </h4>
        </section>
      );
    }

    return (
      <section
        className="container has-text-centered"
        style={{ padding: '4rem 0' }}
      >
        {this.renderProduct(this.props.data.Product)}
        <br />
      </section>
    );
  }
}

const PRODUCT_QUERY = gql`
  query product($productId: ID!) {
    Product(id: $productId) {
      id
      name
      imageUrl
      usdPrice
      productVariants {
        id
        size
      }
    }
  }
`;

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: item => dispatch({ type: ADD_ITEM_TO_CART, item }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(PRODUCT_QUERY, {
    options: ({ match }) => ({
      variables: {
        productId: match.params.productId,
      },
      errorPolicy: 'all',
    }),
  })(StoreProduct),
);
