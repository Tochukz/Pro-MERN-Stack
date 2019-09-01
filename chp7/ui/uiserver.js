require('dotenv').config();
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const apiProxyTarget = process.env.API_PROXY_TARGET;

app.use(express.static(path.join(__dirname, 'public')));
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }));
}

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

const port = process.env.UI_SERVER_PORT || 8000;

app.listen(port, () => console.log(`UI server runnning on ${port}`));
