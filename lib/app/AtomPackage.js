'use babel';

import autoBind from 'class-autobind';
import React from 'react';
import ReactDOM from 'react-dom';
import { CompositeDisposable } from 'atom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import actions from '../actions';
import reducers from '../reducers';
import App from '../components/App';
import AtomHelper from './AtomHelper';

export default class AtomPackage {

  constructor() {
    autoBind(this);
  }

  activate(state) {
    this.state = state;
    this.element = document.createElement('div');
    this.element.id = 'chloe';
    this.element.classList.add('chloe');

    const enhancer = applyMiddleware(thunkMiddleware);
    this.store = createStore(reducers, this.state, enhancer);

    this.render();

    this.atom = new AtomHelper();
    this.atom.addPanel(this.element);
    this.atom.addOpener();
    this.atom.addCommands();
    this.atom.on('reset', this.reset);
    this.atom.on('openUrl', this.dispatcher(actions.openUrl));
    this.atom.on('closeUrl', this.dispatcher(actions.closeUrl));
  }

  deactivate() {
    this.element.remove();
    this.atom.destroy();
  }

  serialize() {
    return this.state;
  }

  dispatcher(action) {
    return (arg) => this.store.dispatch(action(arg));
  }

  openTerminal() {
    atom.commands.dispatch(this.element, 'term3:open');
  }

  reset() {
    this.state = {};
    atom.commands.dispatch(this.element, 'window:reload');
  }

  render() {
    const mapStateToProps = (state) => {
      this.state = state;
      return state;
    };
    const Container = connect(mapStateToProps, actions)(App);
    const provider = (
      <Provider store={this.store}>
        <Container element={this.element} />
      </Provider>
    );
    ReactDOM.render(provider, this.element);
  }

};
