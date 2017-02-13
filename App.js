import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './Reducers';

 class App extends Component {

  render() {
    return (
<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
  </Provider>
       );
  }


  }
export default App;
