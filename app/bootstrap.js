'use babel';

import lodash from 'lodash';
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
  const boundActions = bindActionCreators(actions, store.dispatch);
  const Container = connect(lodash.identity, actions)(App);
  const provider = (
    <Provider store={store}>
      <Container element={element} />
    </Provider>
  );
  ReactDOM.render(provider, element);

  return {
    subscribe: handler => store.subscribe(handler),
    getState: () => store.getState(),
    getActions: () => boundActions,
  };
};
