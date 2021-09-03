import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import logger from 'redux-logger';
// import rootReducer, { rootSaga } from './store';
import App from './App';

const sagaMiddleware = createSagaMiddleware();

// const middleware = process.env.NODE_ENV === 'development' ? [sagaMiddleware, logger] : [sagaMiddleware];

// const store = configureStore({
//   reducer: rootReducer,
//   middleware,
// });

// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  // <Provider store={store}>
  <HelmetProvider>
    <App />
  </HelmetProvider>,
  // </Provider>,
  document.getElementById('root'),
);
