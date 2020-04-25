
# Period 2
Mappestruktur og filnavne burde være tilstrækkeligt deskriptiv til at beskrive alt, om hvilke filer der hører til hvilke af periodens opgaver.

Min gameAPI deployment virker ikke lige nu (https://expressdemo.helvedesmaskine.dk/gameapi), så jeg må lige prøve forfra på et senere tidspunkt.

## General Node.js + Express
Note: This description is too big for a single exam-question. It will be divided up into separate questions for the exam

- Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat
	- See Period 1 for difference between Java and Javascript/Node.js in general. Both strategies use RESTful Web Services to set up endpoints on either an Express server or a Tomcat server.
	- Tomcat needed to be installed and started, and only then could we deploy .war files on it, but you can deploy any amount of projects. With express you build your server yourself with libraries, and if you want more than one project running, you need to run an express server for each, which the projects handle themselves.
	- Pros: You get to build your entire application in javascript, instead of shifting between a backend language and a frontend language. Communication in JSON format is a more natural part of Express endpoints. High performance.
	- Cons: In regards to what we have actually learned so far, the Java/Tomcat setup is much better hooked up to Continous Integration to automatically deploy whenever you push to git.
- Explain the difference between Debug outputs and ApplicationLogging. What’s wrong with console.log(..) statements in our backend code.
	- Debug outputs should be in development mode only, while application logging is great to log clients' relevant data use in production mode too. Console.log statements shouldn't be used because (a) they are synchronous, so they will block your app, and (b) they always log to console regardless of dev/production mode.
- Demonstrate a system using application logging and environment controlled debug statements.
	- See "user.ts" in Period2-Day2 ("express-solution") for example using the debug npm library. Also see the logging middleware in that same project.
- Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript/Typescript + relevant packages 
	- Run "npm test". Period2-Day4 "period2GameProject" contains examples.
	- Write tests using the Mocha framework for before/after code blocks (setting up and closing server) as well as getting nicely formatted test logging -- and the Chai library for multiple different ways to compare expected values with actual results.
	- Use asynchronous fetch (npm package "node-fetch") to simulate client requests and receive responses in JSON format.
- Explain a setup for Express/Node/Test/Mongo-DB development with Typescript, and how it handles "secret values", debug and testing.
	- "tsc --init" creates tsconfig.json file. Defines build folder location, and where to find ts files to transpile.
	- See package.json scripts for nodemon, build, debug and testing.
	- See Atlas for MongoDB cluster setup.
	- .env file for secret values; MongoDB access link. Always git-ignored(!)
- Explain, using relevant examples, the Express concept; middleware.
	- An express app is essentially a series/stack of middleware function calls. Every middleware call can do something with the http request and response and then pass control to the next() middleware, unless a route ends the request/response cycle. Middleware always run from top to bottom. You can bind middleware to the top application level or to a single router.
	- Period2-Day2 ("express-solution") contains examples; basic-auth, errorhandling, logger, CORS, static files, both custom and third-party middleware.
- Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express  + TypeScript and demonstrate how you have tested the API.
	- Period2-Day4 "period2GameProject" contains examples.
- Explain, using relevant examples, how to test JavaScript/Typescript Backend Code, relevant packages (Mocha, Chai etc.) and how to test asynchronous code.
	- Period2-Day4 "period2GameProject" contains examples.

**How to deploy a Node.js/Express app:**
- Explain, preferably using an example, how you have deployed your Node/Express applications.
	- Create a Node.js droplet on Digital Ocean -- with HTTPS and non-root user as normal (see Digital Ocean Setup document).
	- Create a new Domain DNS record for your project that redirects to your droplet.
	- Clone your git repository into an "apps" folder on your droplet. Run "sudo chmod -R a+rwx project_folder".
	- Set up environment variables in project folder ("sudo nano .env" -> see envSetup document).
	- Set up proxy redirect (see nginxProxyInfo document).
	- Install required packages ("sudo npm install") and transpile typescript code ("sudo npm run build").
	- Start server with process manager, and set up automatic reboot on error ("sudo pm2 startup" + follow given instructions if any) and on changes ("pm2 start ./build/app.js --watch --ignore-watch="node_modules" --name MyAppName").
- Which of the Express Production best practices you have followed?
	- **To do:** Deploy a project where you actually follow all the practices.
	- Nginx reverse proxy (should do compression on that level automatically). (according to the Best Practices site).
	- Asynchronous code in general, including correct logging as explained above. Remember to set NODE_ENV environment variable to "production".
	- Handle exceptions properly; async/await + try/catch + errorhandling middleware.
	- Use PM2 to ensure app automatically restarts if anything crashes (see above). Optionally improve performance with clustering and scaling.
- Explain possible steps to deploy many node/Express servers on the same droplet on the same port (80).
	- Nginx uses port 80 and redirects to express servers on other ports. Just make sure to add a new DNS Record for each app/server you want to run on the same domain.
- Explain how to ensure servers will continue to operate, even after a droplet restart / that your Node-process restarts after a (potential) exception that closed the application.
	- See deployment above.

## NoSQL and MongoDB
- Explain, generally, what is meant by a NoSQL database.
	- Compromises consistency with simplicity, flexibility, and efficiency. You can store data without keys and categories in any data collection without having to think about its rules and limits.
- Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.
	- SQL (relational) databases are rigid; you have to know up front exatly what the structure of schemas and relations is before we write data into them. Requires discipline and effort to uphold rules (normalization!), and changes to data structure are hard to implement. Not as quick as NoSQL, no horizontal scaling. Pros: Predictable layout and quicker UPDATEs if you have relations.
	- NoSQL is designed to handle high levels of READs and WRITEs while scaling both horizontically and vertically (read up on scaling further!), as long as there are no relational dependencies. Lots of duplicate data, but doesn't matter because it's so fast. No rules, no limits. Relational data has to be merged manually though, which is slower.
	- MongoDB is great for JS development as it uses a JSON-like data format.
- Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them. Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere and perhaps also the Unique Index.
	- Indexes are special data structures that store a small portion of a collection's data set in an way that is easier to used to access to limit the number of documents a query must inspect. Without indexes, MongoDB scans every document in a collection to select those that match.
	- Additionally, indexes can be used to apply properties to a specific collection field that specify limitations or functionalities; e.g. TTL (time-to-live), Unique, and 2dsphere.
	- Period2-Day4 "period2GameProject" contains examples (see "gameFacade.ts" and "userFacadeWithDB.ts").
- Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB
	- Period2-Day4 "period2GameProject" contains examples (see "userApiDB.ts").
	- **To do:** UPDATE query.
- Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)
	- Period2-Day4 "period2GameProject" contains examples.
- Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization
	- Period2-Day4 "period2GameProject": Indexes set requirements for certain fields in a document, but that is the only form of normalization. Also, example of ignoring relations (idk if relevant); there's duplicate data in user collection and position collection, "username" and "name".

## Geo-location and Geojson
- Explain and demonstrate basic Geo-JSON, involving as a minimum, Points and Polygons
	- Basically a way to structure and work with geographic coordinates -- using the format; [longitude, latitude, elevation].
	- GeoJson uses different kinds of geographic geometries consisting of a type and a collection of coordinates; Point (single position), LineString (any number of positions linked together), and Polygons (a number of positions linked together to create a shape with an inside and an outside + optionally any number of additional shapes to create "holes" inside the polygon).
	- Period2-Day4 "period2GameProject" and Period2-Day5 "geo_demo1" contains examples.
- Explain and demonstrate ways to create Geo-JSON test data
	- Period2-Day4 "period2GameProject" ("makeTestDataLocation.ts").
	- Period2-Day5 "geo_demo1" ("gameData.js"). We used *geojson.io* to create the GeoJson data from real map coordinates. Google Maps can be used too to find coordinates of any real location.
- Explain the typical order of longitude and latitude used by Server-Side API’s and Client-Side API’s
	- Although you historically usually order coordinates [latitude, longitude], GeoJson matches the X,Y order of math; [longitude, latitude]. This means that client-side APIs usually use the former, while server-side APIs and MongoDB uses the latter.
- Explain and demonstrate a REST API that implements geo-features, using a relevant geo-library and plain JavaScript
	- Period2-Day5 "geo_demo1" contains examples.
- Explain and demonstrate a REST API that implements geo-features, using Mongodb’s geospatial queries and indexes.
	- Period2-Day4 "period2GameProject" ("gameFacade.ts") contains examples.