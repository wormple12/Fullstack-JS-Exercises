
# Period 4
An introduction to GraphQL development with ReactJS.

Mappestruktur og filnavne burde være tilstrækkeligt deskriptiv til at beskrive alt, om hvilke filer der hører til hvilke af periodens opgaver.

### Progress
1. Friends-projektet er ikke deployed.
2. Teamfinder-projektet er ikke opdateret til GraphQL udover User API'en, og UserAPI er ikke deployed.

Jeg arbejder på sagen, og prøver virkelig at få deployment ordnet mandag d. 18/05. Denne side opdateres løbende.

### Backend API
???

## Exam Questions
Note: This description is too big for a single exam-question. It will be divided up into separate questions for the exam.

- Explain shortly about GraphQL, its purpose and some of its use cases
	- GraphQL (by Facebook) is an alternative API framework to REST. It is no more than a set of standards and specifications, and can be implemented in any programming language. It doesn't care about the database or the format that is used to store the data.
	- Where REST provides a range of different endpoints that responds with very specific data, GraphQL provides a single extremely flexible endpoint (a "graph" or "schema") that can return any amount of data as needed. It is much more efficient in that it only fetches exactly the data that is needed. It hands power to the client instead of the server, but still manages to define rules for what can be requested and what is required.
	- For use cases, see below.
	- Disadvantages compared to REST: Performance issues with resolving too many nested fields at once - safer to be specific with dedicated endpoints. REST is less complicated and as such a better choice for for small applications that don't need flexible queries.
- Explain some of the Server Architectures that can be implemented with a GraphQL backend
	- A single GraphQL server that fetches requested information from a directly connected database as needed.
	- A GraphQL layer that acts as a unified, coherent front API for a number of other systems/servers to simplify the fetching process for clients. Like a proxy.
	- A hybrid of the architectures above - with a connected db and integrating/unifying third-party systems.
- What is meant by the terms over- and under-fetching in relation to REST
	- You get what you get from a REST endpoint as specified in the backend server. When needing specific information from the server that has not been specifically planned for when designing the backend, you might not get enough from a single endpoint (underfetching), or you simply don't need as much information right now as the endpoint gives you (overfetching).
- Explain shortly about GraphQL Schema Definition Language, and provide a number of examples of schemas you have defined.
	- As the name suggests: A language used to defined graphQL schemas. Has a simple syntax as a hierarchy of objects and fields (like JSON) with a type system (see below). A schema can define a Query object with possible queries and a Mutation object with possible mutations.
	- You can define documentation for anything using the """ notation.
	- See graphql-demo -> schema.js
- Explain shortly about GraphQL’s type system and some of the benefits we get from this
	- Each field and argument in GraphQL must be defined with a name and a type. Each field resolves to either one of the 5 built-in scalar types (Int, Float, String, Boolean, ID) that point to actual data, to a custom object type with additional fields, to a custom enum, or to a list of one of the before-mentioned.
	- A type is nullable by default (it does not need to be provided), but can be defined as non-nullable ("!"). [String!] means a nullable list of non-nullable values, [String]! means a non-nullable list of nullable values, etc.
	- When a query/mutation expects multiple arguments, you can define an "input" object type instead where each field represents an argument.
	- Benefits: Validation and type checking out-of-the-box. Even without manual documentation, you can always see what types the API queries expect and return. No need to manually validate data format either, as graphql does this on its own.
- Provide a number of examples demonstrating data fetching with GraphQL. You should provide examples both running in a Sandbox/playground and examples executed in an Apollo Client
	- Sandbox Environment: Run graphql-demo, and open localhost:5555/graphql.
	- See graphql-client -> AllFriends.js and FindFriend.js
- Provide a number of examples demonstrating; creating, updating and deleting with Mutations. You should provide examples both running in a Sandbox/playground and examples executed in an Apollo Client.
	- Sandbox Environment: Run graphql-demo, and open localhost:5555/graphql.
	- Creating: See graphql-client -> AddFriend.js
	- Updating: See graphql-client -> AddFriend.js
	- Deleting: See graphql-client -> AllFriends.js
- Explain the Concept of a Resolver function, and provide a number of simple examples of resolvers you have implemented in a GraphQL Server.
	- Where the schema describes all of the fields, arguments, and result types, the resolvers are functions that are called to actually execute the functionality of a query/mutation. It has the responsiblity to *do* (receive data and return data), where the schema *defines* (what kind of data should be received and returned).
	- A resolver function accepts four arguments, but the most important is the second one ("args") that is an object containing all the arguments passed to the query/mutation.
	- See graphql-demo -> resolvers.js
- Explain the benefits we get from using a library like Apollo-client, compared to using the plain fetch-API
	- Apollo uses "declarative data fetching" -> all of the logic for retrieving your data, tracking loading and error states, and updating your UI is encapsulated by the useQuery hook. So it combines a lot of different aspects that you would otherwise have to do each on its own; it renders dynamically and reactively whenever data is fetched - in a single React hook.
	- Apollo has an intelligent cache to avoid unnecessary server requests; as soon as data has been loaded once, it doesn't need to be fetched again, unless warranted.
	- Combining local and remote data/state, see https://www.apollographql.com/docs/react/why-apollo/
- In an Apollo-based React Component, demonstrate how to perform GraphQL Mutations?
	- See graphql-client -> AddFriend.js
	- Define gql mutation, useMutation returns function and data, make sure to also update cache when function is called.
- Demonstrate and highlight important parts of a “complete” GraphQL-app using Express and MongoDB on the server-side, and Apollo-Client on the client.
	- See graphql-demo (server) and graphql-client (apollo).

In an Apollo-based React Component, demonstrate how to perform GraphQL Queries, including:
- Explain the purpose of ApolloClient and the ApolloProvider component
	- Provides your client app with a GraphQL server that can be easily accessed in any component in your app.
	- See graphql-demo -> App.js
- Explain the purpose of the gql-function (imported from graphql-tag)
	- 'gql' is a template literal tag that is used to define queries/mutations in an easy-to-manage format, and then parse it into a GraphQL syntax tree object (see https://www.npmjs.com/package/graphql-tag)
- Explain Custom Hooks used by your Client Code
	- See graphql-client -> AllFriends.js
- Explain and demonstrate the caching features built into Apollo Client
	- See graphql-client -> AllFriends.js
	- See the update() call that makes the friends hook rerender based on a change in the cache instead of an actual refetch. So the hook is linked to both a graphql server and a cache at the same time.