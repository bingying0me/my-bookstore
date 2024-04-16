import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook, modifyBook } from '../actions/bookActions';
import { Book } from '../types';
import '../styles/AddBookForm.css';

interface AddBookFormProps {
  onSubmit: (book: Book) => void;
  onClose: () => void;
  book?: Book;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit, onClose, book }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (book) {
      setName(book.name);
      setPrice(book.price);
      setCategory(book.category);
      setDescription(book.description);
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: book ? book.id : uuidv4(),
      name,
      price,
      category,
      description,
    };
    if (book) {
      dispatch(modifyBook(newBook));
    } else {
      dispatch(addBook(newBook));
    }
    onSubmit(newBook);
    onClose();
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="popup">
        <div className="popup-inner">
          <h2>{book ? 'Modify Book' : 'Add Book'}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <div className="button-group">
              <button type="submit">{book ? 'Modify' : 'Add'}</button> 
              <button className="close-btn" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBookForm;