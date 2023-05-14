import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import useModels from '../../models';

/*
  useStoreConfig => HOOK
  - This hook exports store and persistor of application
  - blacklist property of persistConfig have a all the name of the reducers in array,
    that you do not want the information to persist
*/
const useStoreConfig = () => {
  // Models
  const { useReducers } = useModels();
  const reducers = useReducers();

  const initialState = {};
  let middlewaresToApply = [thunk];

  const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [],
  };

  const persistReduce = persistReducer(persistConfig, reducers);

  if (process.env.ENVIRONMENT === 'dev') {
    const reduxInmmutableStateInvariant =
      require('redux-immutable-state-invariant').default();
    middlewaresToApply = [...middlewaresToApply, reduxInmmutableStateInvariant];
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let store = createStore(
    persistReduce,
    initialState,
    composeEnhancers(applyMiddleware(...middlewaresToApply))
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

export default useStoreConfig;
