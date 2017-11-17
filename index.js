const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ws = require('express-ws')(app);

app.use(bodyParser.json())

app.use(express.static(__dirname + '/static'));

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);
    ws.send(`Received: ${msg}`);
  });

  ws.on('close', (msg) => {
    console.log(msg);
  });
});

// ================================================================================
//  Routes
// ================================================================================
require('./routes/api')(app, express, ws);

app.listen(4000);
