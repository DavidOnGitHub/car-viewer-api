const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./src/schema.js');

const port = 3001;
const app = express();
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log(`listening on port ${port}`);
