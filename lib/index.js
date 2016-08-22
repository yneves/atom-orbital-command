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
import uid from 'uid';
import openUrl from './actions/openUrl';
import closeUrl from './actions/closeUrl';

export default {

  panel: null,
  subscriptions: null,

  activate(state) {
    this.state = state;
    this.element = document.createElement('div');
    this.element.id = 'chloe';
    this.element.classList.add('chloe');

    const enhancer = applyMiddleware(thunkMiddleware);
    this.store = createStore(reducers, this.state, enhancer);

    this.render();

    this.panel = atom.workspace.addRightPanel({
      item: this.element,
      visible: true
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.workspace.addOpener((url) => {
      if (/^http\:|^https\:/.test(url)) {
        return this.createBrowserView(url);
      }
    }));

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
    // return {};
    return this.state;
  },

  toggle() {
    return (
      this.panel.isVisible() ?
      this.panel.hide() :
      this.panel.show()
    );
  },

  createBrowserView(url) {
    const id = uid();
    const div = document.createElement('div');
    div.id = id;
    setTimeout(() => this.store.dispatch(openUrl(url, id)), 100);
    return {
      element: div,
      getTitle: () => url,
      getURI: () => url,
      getPath: () => url,
      destroy: () => this.store.dispatch(closeUrl(id))
    };
  },

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
