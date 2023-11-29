import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, REMOVE_BOOK } from '../utils/mutations'; 

const SavedBooks = () => {
  // Use the useQuery hook to execute the GET_ME query
  const { loading, error, data } = useQuery(GET_ME);

  // Use the useMutation hook to execute the REMOVE_BOOK mutation
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleRemoveBook = async (bookId) => {
    try {
      // Execute the REMOVE_BOOK mutation
      await removeBook({
        variables: {
          bookId: bookId,
        },
        refetchQueries: [{ query: GET_ME }],
      });

      console.log('Book removed successfully!');
    } catch (error) {
      console.error('Error removing book:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <div>
      <h2>Saved Books</h2>
      <ul>
        {me.savedBooks.map((book) => (
          <li key={book.bookId}>
            <div>
              <h3>{book.title}</h3>
              <p>Authors: {book.authors.join(', ')}</p>
              <p>Description: {book.description}</p>
              <p>
                <img src={book.image} alt={book.title} />
              </p>
              <p>Link: <a href={book.link} target="_blank" rel="noopener noreferrer">{book.title} on Google Books</a></p>
              <button onClick={() => handleRemoveBook(book.bookId)}>Remove Book</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedBooks;