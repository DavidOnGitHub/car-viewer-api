const Makes = require('../resource/makes.json');
const Models = require('../resource/models.json');
const CarOfTheWeek = require('../resource/carOfTheWeek.json');

const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLFloat
} = require('graphql');

const ModelType = new GraphQLObjectType({
  name: 'Model',
  description: 'Car model',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    makeId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLFloat },
    imageUrl: { type: GraphQLString }
  })
});

const MakeType = new GraphQLObjectType({
  name: 'Make',
  description: 'Car make',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const CarOfTheWeekType = new GraphQLObjectType({
  name: 'CarOfTheWeekType',
  description: 'Car of the week',
  fields: () => ({
    modelId: { type: new GraphQLNonNull(GraphQLString) },
    review: { type: GraphQLString }
  })
});

const RootType = new GraphQLObjectType({
  name: 'CarSchema',
  description: 'Root schema for car app',
  fields: () => ({
    makes: {
      type: new GraphQLList(MakeType),
      description: 'All makes',
      resolve: function() {
        return Makes
      }
    },
    models: {
      type: new GraphQLList(ModelType),
      description: 'All models',
      resolve: function() {
        return Models
      }
    },
    carOfTheWeek: {
      type: CarOfTheWeekType,
      description: 'Car of the week',
      resolve: function() {
        return CarOfTheWeek
      }
    }
  })
});

const RootSchema = new GraphQLSchema({
  query: RootType
});

module.exports = RootSchema;
