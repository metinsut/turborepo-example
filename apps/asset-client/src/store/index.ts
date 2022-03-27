import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const initialState = {};
const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducer
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
