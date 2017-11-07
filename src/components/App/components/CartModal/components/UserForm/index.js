import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_USER_INFOS } from '../../../../../../config/actionTypes';

class UserForm extends Component {
  state = {
    fullName: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
  };

  componentWillMount() {
    const user = window.localStorage.getItem('user');

    if (user) {
      this.setState({
        ...JSON.parse(user),
      });
    }
  }

  handleFullNameChange = event => {
    this.setState({
      fullName: event.target.value,
    });
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleAddressChange = event => {
    this.setState({
      address: event.target.value,
    });
  };

  handlePostalCodeChange = event => {
    this.setState({
      postalCode: event.target.value,
    });
  };

  handleCityChange = event => {
    this.setState({
      city: event.target.value,
    });
  };

  handleStateChange = event => {
    this.setState({
      state: event.target.value,
    });
  };

  handleCountryChange = event => {
    this.setState({
      country: event.target.value,
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onUserUpdate(this.state);
    this.props.loadNextPage();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">
              Full name <small>*</small>
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  required
                  autoComplete="name"
                  className="input"
                  type="text"
                  placeholder="John Doe"
                  value={this.state.fullName}
                  onChange={this.handleFullNameChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">
              Email <small>*</small>
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  required
                  autoComplete="email"
                  className="input"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">
              Address <small>*</small>
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <textarea
                  required
                  autoComplete="shipping street-address"
                  className="textarea"
                  placeholder="Ethereum Mainnet"
                  value={this.state.address}
                  onChange={this.handleAddressChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">
              Postal code <small>*</small>
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  required
                  autoComplete="shipping postal-code"
                  className="input"
                  placeholder="10011"
                  value={this.state.postalCode}
                  onChange={this.handlePostalCodeChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">
              City <small>*</small>
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  required
                  autoComplete="shipping address-level2"
                  className="input"
                  placeholder="New York"
                  value={this.state.city}
                  onChange={this.handleCityChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">State</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  autoComplete="shipping address-level1"
                  className="input"
                  placeholder="NY"
                  value={this.state.state}
                  onChange={this.handleStateChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">
              Country <small>*</small>
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  required
                  autoComplete="shipping country"
                  className="input"
                  placeholder="USA"
                  value={this.state.country}
                  onChange={this.handleCountryChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="field is-grouped"
          style={{ justifyContent: 'flex-end' }}
        >
          <p className="control">
            <a
              style={{ lineHeight: '36px' }}
              onClick={() => {
                this.props.loadPreviousPage();
              }}
            >
              Back
            </a>
          </p>
          <p className="control">
            <button type="submit" className="button is-dark">
              Payment
            </button>
          </p>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onUserUpdate: user => dispatch({ type: UPDATE_USER_INFOS, user }),
});

export default connect(() => ({}), mapDispatchToProps)(UserForm);
