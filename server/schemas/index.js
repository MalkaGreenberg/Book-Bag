// const { ApolloServer } = require('@apollo/server');
// const express = require('express');
// const typeDefs = require('./typeDefs');
// const resolvers = require('./resolvers');
// const db = require('../config/connection');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     // You can add logic here to extract user information from the request if needed
//     return {
//       user: req.user,
//     };
//   },
// });

// // server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };