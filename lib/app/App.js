'use babel';

import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import actions from '../actions';
import reducers from '../reducers';
import Container from '../components/App';

export default class App {

  constructor(element, state = {}) {
    this.state = state;
    this.element = element;
    this.element.id = 'chloe';
    this.element.classList.add('chloe');

    const enhancer = applyMiddleware(thunkMiddleware);
    this.store = createStore(reducers, this.state, enhancer);
  }

  getState() {
    return this.state;
  }

  getActions() {
    return R.map((action) => {
      return (...args) => {
        return this.store.dispatch(action.apply(undefined, args));
      };
    }, actions);
  }

  render() {
    const mapStateToProps = (state) => {
      this.state = state;
      return state;
    };
    const Connected = connect(mapStateToProps, actions)(Container);
    const provider = (
      <Provider store={this.store}>
        <Connected element={this.element} />
      </Provider>
    );
    ReactDOM.render(provider, this.element);
  }

};
