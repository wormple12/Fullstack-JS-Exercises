var express = require('express');
var graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require("graphql-tools");
const _ = require("lodash")
const cors = require("cors")
const fetch = require("node-fetch");
const LRU = require("lru-cache");
const { unique } = require("shorthash");
const { generate } = require("shortid");

const DOG_API = "https://dog.ceo/api";

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.send("GraphQL Demo Endpoint")
})

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    rates(currency: String!): [ExchangeRate]
  
    dogs: [Dog]
    dog(breed: String!): Dog
    

    todos: [Todo]
		todo(id: String!): Todo
  }

  type Todo {
		id: String!
		type: String!
	}

	type Dog {
		id: String!
		breed: String!
		displayImage: String
		images: [Image]
		subbreeds: [String]
	}

	type Image {
		url: String!
		id: String!
	}

	type ExchangeRate {
		currency: String
		rate: String
		name: String
  }
  
  type Mutation {
		addTodo(type: String!): Todo
		updateTodo(id: String!, type: String!): Todo
	}
`;

const cache = new LRU({ max: 50, maxAge: 1000 * 60 * 60 });

const createDog = (subbreeds, breed) => ({
  breed,
  id: unique(breed),
  subbreeds: subbreeds.length > 0 ? subbreeds : null
});

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    rates: async (root, { currency }) => {
      try {
        console.log("FETCHING")
        const results = await fetch(
          `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
        );
        const exchangeRates = await results.json();

        return _.map(exchangeRates.data.rates, (rate, currency) => ({
          currency,
          rate
        }));
      } catch (e) {
        console.error(e);
      }
    },

    dogs: async () => {
      const results = await fetch(`${DOG_API}/breeds/list/all`);
      const { message: dogs } = await results.json();

      return _.map(dogs, createDog);
    },
    dog: async (root, { breed }) => {
      const results = await fetch(`${DOG_API}/breed/${breed}/list`);
      const { message: subbreeds } = await results.json();

      return createDog(subbreeds, breed);
    },

    todos: () => {
      const todos = [];
      cache.forEach((type, id) => todos.push({ type, id }));
      return todos;
    },
    todo: (_, { id }) => {
      return { id, type: cache.get(id) };
    }
  },
  Dog: {
    displayImage: async ({ breed }) => {
      const results = await fetch(`${DOG_API}/breed/${breed}/images/random`);
      const { message: image } = await results.json();
      return image;
    },
    images: async ({ breed }) => {
      const results = await fetch(`${DOG_API}/breed/${breed}/images`);
      const { message: images } = await results.json();
      return images.map(image => ({ url: image, id: unique(image) }));
    }
  },
  ExchangeRate: {
    name: async ({ currency }) => {
      try {
        const results = await fetch("https://api.coinbase.com/v2/currencies");
        const currencyData = await results.json();

        const currencyInfo = currencyData.data.find(
          c => c.id.toUpperCase() === currency
        );
        return currencyInfo ? currencyInfo.name : null;
      } catch (e) {
        console.error(e);
      }
    }
  },
  Mutation: {
    addTodo: (_, { type }) => {
      const id = generate();
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
    updateTodo: (_, { type, id }) => {
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    }
  }
};


const schema = makeExecutableSchema({ typeDefs, resolvers })
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))


app.listen(4000, () => console.log(`🚀 Server ready at 4000`));
