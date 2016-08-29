'use babel';

import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import actions from './actions';
import reducers from './reducers';
import App from './components/App';

export default (element, state) => {

  const enhancer = applyMiddleware(thunkMiddleware);
  const store = createStore(reducers, state, enhancer);
  const Container = connect(R.identity, actions)(App);
  const provider = (
    <Provider store={store}>
      <Container element={element} />
    </Provider>
  );
  ReactDOM.render(provider, element);

  return {
    getState: () => store.getState(),
    getActions: () => bindActionCreators(actions, store.dispatch),
  };
};
