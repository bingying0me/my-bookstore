import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import BooksPage from './pages/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const store = createStore(rootReducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage books={[]} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;