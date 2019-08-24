# Pro MERN Stack  
[Github Repo](https://github.com/vasansr/pro-mern-stack-2)  


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
`$ npx babel ---verion`  
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

## Chapter 5: Express and GraphQLchp
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
