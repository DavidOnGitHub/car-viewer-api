const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./src/schema.js');
const makes = require('./resource/makes.json');
const models = require('./resource/models.json');
const carOfTheWeek = require('./resource/carOfTheWeek.json');

const port = 3001;
const app = express();
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: {
    makes, models, carOfTheWeek
  },
  graphiql: true
}));

app.listen(port);
console.log(`listening on port ${port}`);
