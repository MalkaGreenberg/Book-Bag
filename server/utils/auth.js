
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({req}) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if(!token){
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch (error) {
      console.error('Invalid token:', error.message);
      throw new Error('Invalid token!');
    };

    return req;

  },
  signToken: function ({username, email, _id}) {
    const payload = {username, email, _id};

    return jwt.sign({data:payload}, secret, {expiresIn: expiration});
  },
};

// const authMiddleware = async ({ req, connection }, next) => {
//   let token;

//   // For HTTP requests
//   if (req) {
//     // allows token to be sent via req.query or headers
//     token = req.query.token || req.headers.authorization;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }
//   }

//   // For WebSocket connections
//   if (connection && connection.context.Authorization) {
//     token = connection.context.Authorization.split(' ').pop().trim();
//   }

//   if (!token) {
//     throw new Error('You have no token!');
//   }

//   try {
//     const { data } = jwt.verify(token, secret, { maxAge: expiration });
//     return { user: data };
//   } catch (error) {
//     console.error('Invalid token:', error.message);
//     throw new Error('Invalid token!');
//   }
// };

// const signToken = ({ username, email, _id }) => {
//   const payload = { username, email, _id };
//   return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
// };

// module.exports = { authMiddleware, signToken };