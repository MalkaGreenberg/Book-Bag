import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations'; 
const SearchBooks = ({ books }) => {
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (book) => {
    try {
      // Execute the SAVE_BOOK mutation
      await saveBook({
        variables: {
          input: {
            authors: book.authors,
            description: book.description,
            title: book.title,
            bookId: book.bookId,
            image: book.image,
            link: book.link,
          },
        },
      });

      console.log('Book saved successfully!');
    } catch (error) {
      console.error('Error saving book:', error.message);
    }
  };

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>
            <div>
              <h3>{book.title}</h3>
              <p>Authors: {book.authors.join(', ')}</p>
              <p>Description: {book.description}</p>
              <p>
                <img src={book.image} alt={book.title} />
              </p>
              <p>Link: <a href={book.link} target="_blank" rel="noopener noreferrer">{book.title} on Google Books</a></p>
              <button onClick={() => handleSaveBook(book)}>Save Book</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;