import { createStore, combineReducers, applyMiddleware } from 'redux';

// This dependency enables the Redux Dev Tools in your Chrome Console.
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import medicationHistoryReducer from './medication-history-reducer';
import medicationsReducer from './medication-reducer';
import userReducer from './user-reducer';
import pageReducer from './page-reducer';

// combine our reducers - right now it isn't necessary, however, you usually will have more than one and it will be.
let reducers = combineReducers({
  medicationHistoryReducer,
  medicationsReducer,
  userReducer,
  pageReducer
});

// finally, we get to actually create the store
const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();
