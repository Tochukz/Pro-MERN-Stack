# Pro MERN Stack (Second Edition) (2019)
[Github Repo](https://github.com/vasansr/pro-mern-stack-2)  

## Chapter 1: Introduction

## Chapter 2:  Hello World
Using nvm: https://github.com/creationix/nvm  
`$ nvm install 10`  
`$ nvm alias default 10`  
`$ node --verison`  

Updating npm  
`$ npm install -g npm@6`  

See all the currently installed packages  
`$ npm ls --depth=0`  

`$ npm start` //Runs `$ node server.js`  

Installing babel for JSX transformation  
`$ npm install --save-dev @babel/core@7 @babel/cli@7`  

Check babel installed verson  
`$ node_module/.bin/babel --version`  

npm gives us `npx` command  which resolves the correct local path of any executable  
`$ npx babel --verion`  
`$ npx express --version`

Install the JSX transform preset for babel  
`$ npm install --save-dev @babel/preset-react@7`  

Transforming JSX from the terminal  
`$ npx babel src --presets @babel/react --out-dir public`

Install `env preset` fro ES2015+ transformation  
`$ npm install --save-dev @babel/preset-env@7`  

Running babel after specifying presets in `.babelrc` file  
`$ npx babel src --out-dir public`  

Installing nodemon  
`$ npm install nodemon@1`  
Using `forever` instead to restart the server on crashes ducring production.  

## Chapter 3: React Component    
[ES2015 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)  

## Chapter 4: React State  
There are libraries called immutability helpers, such as [immutable.js](http://facebook.github.io/immutable-js/),   
which can be used to construct the new state object.   
When a property of the object is modified, the library creates a copy optimally.  
If, in your application, you find that you have to make lots of copies because of deep nesting of objects in the state, you could consider using immutable.js.  

In ES2015, the arrow function has the effect of setting the context (the value of this) to the lexical scope.
This means that this within theccallback will refer to whatever this was in the lexical scope, that is, outside of the anonymous function, where the code is present.  

__Tips__
* When passing a method as property from a parent to a child component always bind the method to the parent like this:
`<child-component addRecord={this.addRecord.bind(this)} />`  
Or you can bind it in the parent't constructor like this
```
class parentClass {
  constructor() {
    this.addRecord = this.addRecord.bind(this);
  }
  ...
  render() {
    return (
      <child-component addRecord={this.addRecord} />
    )
  }
  ...
```
* Avoid keeping computed values in the state; instead, simply compute them when needed, typically inside the render() method.  
* Do not copy props into state, just because props are immutable. If you feel the need to do this, think of modifying the original state from which these props were derived.  
  One exception is when props are used as initial values to the state, and the state is truly disjointed from the original state after the initialization.  
* If you find it doing too many things, just like in functions, it should probably be split into multiple components,   
  so that it follows the Single Responsibility principle (that is, every component should    be responsible for one and only one thing).   
  If you  are passing in too many props to a component, it is an indication that either the component needs to be split,   
  or it need not exist: the parent itself could do the job.  
* If there is a need to know the state of a child in a parent, you’re probably doing it wrong.  
  Although React does offer a way using refs, you shouldn’t feel the need if you follow the one-way data flow strictly:  
  state flows as props into children, events cause state changes, which flows back as props.  
* In a well-designed application, most components would be stateless functions of their properties.   
  All states would be captured in a few components at the top of the hierarchy, from where the props of all the descendants are derived.  

## Chapter 5: Express and GraphQL
[Express Request](http://expressjs.com/en/api.html#req)   
[Node.js Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)  
[Express Response](http://expressjs.com/en/api.html#res)  
[Node.js Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)  

__Install packages for About API__   
`$ npm install graphql@0 apollo-server-express@2`   

GraphQL queries are made by POST. To make query by GET do    
`$ curl 'http://localhost:3000/graphql?query=query+\{+about+\}' `  
It is the same as    
``
query {
  about
}
``
on the GraphQL playground.  
[Async and Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)   

## Chapter 6: MongoDB  
[MongoDB Schema](https://docs.mongodb.com/manual/core/schema-validation/index.html)   
A database connection is restricted to accessing only one database, so to access multiple databases, multiple connections are required.  
Unlike relational databases, MongoDB encourages denormalization, that is, storing related parts of a document as embedded subdocuments rather than as separate collections (tables) in a relational database.  
__MongoDB Services__   
* [MongoDN Atlas](https://www.mongodb.com/cloud/atlas) A small database (shared RAM, 512 MB storage) is available for free.  
* [mLab](https://mlab.com) A sandbox environment is available for free, limited to 500 MB storage.   
* [Compose]((https://www.compose.com) A 30-day trial period is available, but a permanently free sandbox kind of option is not available.   

[Mongo Shell Docs](https://docs.mongodb.com/manual/mongo)   
__Mongo Shell Basic Operation__  
Start the mongo shell  
`> mongo`  
Find which databases are available  
`> show databases`  
Identify the current DB  
`> db`  
See what collections exists in the database  
`> show collections`  

__Note:__ Databases and collections are actually created only on the first write operation.  

Switch to a database called issuetracker  
`> use issuetracker`  
Create a new collection called employees  
`> db.employees.insertOne({name: {first: "John", last: 'Doe'}, age: 44})`  
You can use auto complete to find all the methods available in a collection: Type `db.employees.` and press the tab key.  
Display all the documents in a collection  
`> db.employees.find()`  
Display all the documents in a nicely formatted form  
`> db.employees.find().pretty()`  
Doing JavaScript in the shell  
```
> let result = db.employees.find().toArray()  
> result.forEach(e => print('First Name: ', e.name.first))  
> result.forEach(e => printjson(e.name))  
```
To display methods available on the cursor object do  
`> db.employees.find().help()`  
This will display all the methods that can be chained to the cursor object.  

__MongoDB CRUD Operation__   
Erase a collections  
`> db.employees.drop()`  

__Create Operation__
Create a documnet with our own ID  
 `> db.employees.insertOne({_id: 1,  name: {first: 'John', last: 'Doe'}, age:44})`   
Insert Mutiple documents in a collection  
`> db.employees.insertMany([{id: 1, name: {first: 'John', last: 'Doe'}, age: 44}, {id: 2, name: {first: 'Jane', last: 'Doe'}, age: 16}])`   
`> db.employees.insertMany([{id: 3, name: {first: 'Alice', last:'A'}, age: 32}, {id: 4, name: {first: 'Bob', last:'B'}, age: 64}])`  

__Read Operation__  
Syntax: find([filter, [projection]])
The filter is an object with property name as field and object value as the sepecification.  
The projection is the list of fields to retrieve.  

_Filter_  
Find document with ID of 1
`> db.employees.findOne({id: {$eq: 1}})`  
Or use the shorthand method  
`> db.employees.findOne({id: 1})`
Find all employees whose age is greaer than or equal to 30  
`> db.employees.find({age: {$gte: 30}})`  
Find employees whose age are greater than 30 AND last name is 'Doe'  
`>  db.employees.find({age: {$gt: 30}, 'name.last': {$eq: 'Doe'}})`  
Note that in the schema, 'last' is a property of the root field 'name' i.e nested object.  

Find employees whose age is less than 18 OR greater than 60  
`> db.employees.find({$or: [{age: {$lt: 18}}, {age: {$gt: 60}}]})`  
Find employees whose age is less than or equal to 18 or those who have no age defined
`> db.issues.find({$or: [{age: {$lte: 10}}, {age: {$exists: false}} ]});`   

[MongoDB Operators](https://docs.mongodb.com/manual/reference/operator/query)  

Creating and index on the id field in a collection  
`> db.employees.createIndex({id: 1})`  
Create unique index on the id field in the employee collection  
`> db.employee.createIndex({id: 1}, {unique: true})`   
Now the find() method will perform much better when a filter with id is supplied. Also creation of a document with a duplicate id will be prevented by MongoDB.  
If you have dropped the collection after creating the index, you could run the createIndex()
command to reinstate this index.

_Projection_  
Fetch only first name and age of all the employees  
`> db.employees.find({}, {'name.first': 1, age: 1})`  
Exclude `_id` field from the  fetched documents   
`> db.employees.find({}, { _id: 0, 'name.first': 1, age: 1 })`  

__Update Operation__    
Syntax: update(filter, update)  
Update the age of employee with id  of 2  
`> db.employees.updateOne({id: 2}, {$set: { age: 23 } })`  
Add a new field, 'organization' to all employees   
`> db.employees.updateMany({}, {$set: { organization: 'MyWebstation' }})`  
Replace the document with and id of 4 by a new document  
`> db.replaceOne({id: 4}, {id: 4, name: {first: 'Bobby'}, age: 66})`  
Note the properties 'organization' and 'name.last' will cease to exist in the document of id 4  

__Delete__  
Delete the document with id of 4  
`> db.employee.deleteOne({id: 4})`  
There is also a deleteMany() method.  
check the nummber of documnets remainign in the collection.    
`> db.employees.count()`  
The count method can also take a filter.  

__Aggregate__  
[MongoDB Aggregate](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline)  
[MongoDB Aggregation functions](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#accumulator-operator.)  

Retrieve all employees who have middle names  
`> db.employees.find({$where: "this.name.middle != undefined"})`  
Or  
`> db.employees.find({'name.middle': {$exists: true}})`  
Remove the middle name field from document of id 4  
`> db.employees.update({id: 4}, {$unset: {'name.middle': ''}})`  

__MongoDB Node.js Driver__  
Install mongodb Driver  
`$ npm install mongodb@3`  

__Eval flag__  
Run mongo command inline   
Syntact: mongo database_name --eval "command to run"   
Remove all documents in employees collection of the issuetracker database.   
`$ mongo issuetracker --eval "db.employees.remove({})"`   

__Running a mongo script__  
`$ mongo issuetracker script/init.mongo.js`  
Run using the mongo shell. For remote databases, ensure that the connection string is supplied in the command line.  
For example:  
localhost:  
   `$ mongo issuetracker scripts/init.mongo.js`  
Atlas:  
  `$ mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js`  
MLab:  
  `& mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js`    

[MongoDB Index Types](https://docs.mongodb.com/manual/indexes/#index-types)

[NodeJS MongoDB Driver]((http://mongodb.github.io/node-mongodb-native)

## Chapter 7: Architecture and ESLint
[Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)  
Install the dotenv package  
`$ npm install dotenv@6`  
Install the http-proxy-middleware  
`$ npm install http-proxy-middleware@0`  
Installing ESLint and it's dependencies on the API   
`$ npm install --save-dev eslint@5 eslint-plugin-import@2`  
`$ npm install --save-dev eslint-config-airbnb-base@13`  
Runnig eslint on the API code  
`$ npx eslint .`    
Installing eslint for the UI  
`$ npm install --save-dev eslint@5 eslint-plugin-import@2`  
`$ npm install --save-dev eslint-plugin-jsx-a11y@6 eslint-plugin-react@7`   
`$ npm install --save-dev eslint-config-airbnb @17`  
Running eslint on the UI code  
`$ npx eslint . --ignore-pattern public`  
Another way of ignoring patterns of files is to add them as lines to a text file called .eslintignore.
This is useful when there are many patterns to be ignored.

Runninng eslint to check React code  
`$ npx eslint . --ext js,jsx --ignore-pattern public`  

## Chpater 8: Modularization and Webpack  
Installing Webpack  
`$ npm installl --save-dev webpack@4 webpack-cli@3`  
Check the installed version of webpack  
`$ npx webpack --version`  
To "pack" app.js file and created a bundler called app.bundle.js  
`$ npx webpack public/app.js --out public/app.bundle.js`  
TO get rid of the warning message, use the develpment mode:  
`$ npx webpack public/app.js --output public/app.bundle.js --mode development`   
Instead of doing babel transforms and after that webpack packing, we use webpack to combine the two processes.  
To be able to run Babel transforms with webpack we'll need the Babel loader:  
`$ npm install --save-dev babel-loader@8`   
Running webpack after defining configuration in webpack.config.js  
`$ npx webpack`  
Running webpack in watch mode   
`$ npx webpack --watch`  
Installing the npm packages instead of using CDN  
`$ npm install react@16 react-dom@16`  
`$ npm install prop-types@15`  
`$ npm install whatwg-fetch@3`  
`$ npm install babel-polyfill@6`  

__Implementing Hot Module Replacement__  
Install the middleware packages  
`$ npm install --save-dev webpack-dev-middleware@3`   
`$ npm install --save-dev webpack-hot-middleware@2`   

To preserve state during HMR you can use the react-hot-loader. This way what ever you input will remain after the automatic reload.

[Webpack Code Spliting](https://webpack.js.org/guides/code-splitting/)  
[Webpack Lazy Loading](https://webpack.js.org/guides/lazy-loading/)  
[Webpack Output Management](https://webpack.js.org/guides/output-management/)
[HTML Webpack Plugin](https://webpack.js.org/plugins/html-webpack-plugin/)

## Chapter 9: React Router
Installing react router  
`$ npm install reat-router-dom@4`  

[URLSearchParams API](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

Install polyfill to support the URLSearchParams JavaScript API in older browser.   
`$ npm install url-search-params@1`  
To include the polyfill you will have to import it:  
`import URLSearchParams from 'url--search-params'`   

[Life Cycle methods](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)   
[NavLink Docs](https://reacttraining.com/react-router/web/api/NavLink)   
[Component Lifecycle](https://reactjs.org/docs/react-component.html.)   

## Chapter 10: React Form  
An input form element whose value is controlled by React is called a _controlled component_.  

In React, unidirectional data flow is important, and it does not support two-way data binding as part of the library.  To get hold of the new value from a form input, the `onChange()` event has to be trapped which will have the event as an argument and as part of the event, we can get the new value that the user has selected/entered.

React Child components are not recreated/re-rendered when the `props` passed to them by their parent changes. If a child component needs to react to this change, it needs to implement the `componentDidUpdate()` method. This method gets the previous `props` as argument, and you can then compare it to `this.props`(current props) to determine if the component needs to change it's state.

When Using React, it is best not to use the type attribute of input fields, instead it's best to deal with the validation or masking yourself (or use packages that do it for you.) This lets the behavior be predictable across browsers, as well as allow you to make informed decisions on what to do with invalid input.

__Setting State__  
It is not advisable to use `this.state` directly when arriving at the new state, as it may not accurately reflect the real current value when other `setState` calls have been made but are yet to take effect. The recommended way it to supply a callback to the `setState` method that takes in the previous state and returns a new state.   
```
this.setState(prevState => ({
  user: {...prevState.user, [city]: 'Amsterdam'},  
}))
```  

Some UI modules to checkout `react-numeric-input`, `react-datepicker`  

__Specialized Input Component__    
To make React reconstruct a child component when a property passed to the child by it's parent changes, use the `key` property and pass a unique value to it.   
```  
render() {
  <Child user={user} key={id} />
}
```
So if the value of `id` changes the `Child` component will be reconstructed.   

__NB:__ React's `onChange` event when applied to say an input element will behave like HTML `onkeypress` event.  

## Chapter 11: React-Bootstrap  
