import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// // Set up authentication context if needed
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   if (!token) {
//     console.log("no token here! SORRY");
//   }
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// Rest of your imports...
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
