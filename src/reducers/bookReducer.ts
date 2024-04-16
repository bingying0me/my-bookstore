import { ADD_BOOK, MODIFY_BOOK, DELETE_BOOK } from '../components/actionTypes';
import { Book } from '../types';

const initialState: Book[] = [];

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case MODIFY_BOOK:
      return state.map(book => (book.id === action.payload.id ? action.payload : book));
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.payload);
    default:
      return state;
  }
};

export default bookReducer;