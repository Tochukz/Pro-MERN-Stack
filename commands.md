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
`$ npx express --versiion`

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
