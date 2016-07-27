'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import { CompositeDisposable } from 'atom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import actions from './actions';
import reducers from './reducers';
import App from './components/App';

export default {

  panel: null,
  subscriptions: null,

  activate(state) {
    this.state = state;
    this.element = document.createElement('div');
    this.element.id = 'chloe';
    this.element.classList.add('chloe');
    this.render();

    this.panel = atom.workspace.addRightPanel({
      item: this.element,
      visible: true
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chloe:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.element.remove();
    this.panel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return this.state;
  },

  toggle() {
    return (
      this.panel.isVisible() ?
      this.panel.hide() :
      this.panel.show()
    );
  },

  render() {
    const enhancer = applyMiddleware(thunkMiddleware);
    const store = createStore(reducers, this.state, enhancer);
    const mapStateToProps = (state) => {
      this.state = state;
      return state;
    };
    const Container = connect(mapStateToProps, actions)(App);
    const provider = (
      <Provider store={store}>
        <Container />
      </Provider>
    );
    ReactDOM.render(provider, this.element);
  }

};
