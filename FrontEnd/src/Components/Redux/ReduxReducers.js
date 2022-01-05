import { combineReducers } from 'redux';

import DetailsReducer from './DetailsReducer';

import details from './DetailsReducer';


const rootReducer = combineReducers({

    DetailsReducer: DetailsReducer,

});

export default rootReducer;