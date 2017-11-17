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
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: model => model.id
    },
    makeId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: model => model.makeId
    },
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

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Root field',
  fields: () => ({
    carOfTheWeek: {
      type: CarOfTheWeekType,
      description: 'Car of the week'
    },
    makes: {
      type: new GraphQLList(MakeType),
      description: 'All makes'
    },
    models: {
      type: new GraphQLList(ModelType),
      description: 'All models',
      args: {
        id : { type: GraphQLString }
      },
      resolve: (obj, args) => {
        if (args.id) {
          return Models.filter(model => model.id === args.id);
        }
        return Models;
      }
    }
  })
})

const RootType = new GraphQLObjectType({
  name: 'CarSchema',
  description: 'Root schema for car app',
  fields: () => ({
    viewer: {
      type: ViewerType,
      description: 'Root field',
      resolve: obj => obj
    }
  })
});

const RootSchema = new GraphQLSchema({
  query: RootType
});

module.exports = RootSchema;
