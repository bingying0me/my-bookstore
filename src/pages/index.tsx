import { GetServerSideProps } from 'next';
import React from 'react';
import MainPage from '../components/MainPage';
import { Book } from '../types';

interface Props {
  books: Book[];
}

const BooksPage: React.FC<Props> = ({ books }) => {
  return <MainPage books={books} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      books: [],
    },
  };
};

export default BooksPage;