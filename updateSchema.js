const fs = require('fs');
const path = require('path');
const Schema = require('./src/schema');
const { graphql } = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

graphql(Schema, introspectionQuery).then((result) => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }

  fs.writeFileSync(
    path.join(__dirname, '/schema.graphql'),
    printSchema(Schema)
  );
});
