require('dotenv').config();
const builder = require('botbuilder');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create console connector and listen to stdin for messages 
const connector = new builder.ConsoleConnector().listen();

// Create your bot with a function to receive messages from the user
const bot = new builder.UniversalBot(connector, (session) => {
  session.send("You said: %s", session.message.text);
});

