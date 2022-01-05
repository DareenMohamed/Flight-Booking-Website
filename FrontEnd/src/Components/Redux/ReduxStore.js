import { createStore } from 'redux';

import rootReducer from './ReduxReducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


let store = createStore(persistedReducer)
let persistor = persistStore(store)


export default { store, persistor };