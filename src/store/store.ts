import { combineReducers, createStore } from 'redux';
import bookReducer from '../reducers/bookReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  books: bookReducer,
});

const store = createStore(rootReducer);

export default store;