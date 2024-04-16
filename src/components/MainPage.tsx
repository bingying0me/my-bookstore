import React, { useState } from "react";
import { Book } from "../types";
import { useDispatch } from "react-redux";
import { deleteBook, addBook, modifyBook } from "../actions/bookActions";
import AddBookForm from "./AddBookForm";
import "../styles/MainPage.css";

interface MainPageProps {
  books: Book[];
}

const MainPage: React.FC<MainPageProps> = ({ books: initialBooks }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);
  const [isModifyPopupVisible, setModifyPopupVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleModify = (book: Book) => {
    setSelectedBook(book);
    setModifyPopupVisible(true);
  };

  const handleFormSubmit = (newBook: Book) => {
    if (selectedBook) {
      dispatch(modifyBook(newBook));
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === newBook.id ? newBook : book))
      );
    } else {
      dispatch(addBook(newBook));
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
    setSelectedBook(undefined);
    setAddPopupVisible(false);
    setModifyPopupVisible(false);
  };

  return (
    <div>
      <h1>Bookstore</h1>
      <button onClick={() => setAddPopupVisible(true)}>Add a Book</button>
      {isAddPopupVisible && (
        <AddBookForm
          onSubmit={handleFormSubmit}
          onClose={() => setAddPopupVisible(false)}
        />
      )}
      {isModifyPopupVisible && selectedBook && (
        <AddBookForm
          book={selectedBook}
          onSubmit={handleFormSubmit}
          onClose={() => setModifyPopupVisible(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <tr key={book.id} onClick={() => handleModify(book)}>
              <td>{book.name}</td>
              <td>{book.price}</td>
              <td>{book.category}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(book.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
