import { ADD_BOOK, MODIFY_BOOK, DELETE_BOOK } from '../components/actionTypes';
import { Book } from '../types';

export const addBook = (book: Book) => {
  return {
    type: ADD_BOOK,
    payload: book,
  };
};

export const modifyBook = (book: Book) => {
  return {
    type: MODIFY_BOOK,
    payload: book,
  };
};

export const deleteBook = (id: string) => {
  return {
    type: DELETE_BOOK,
    payload: id,
  };
};