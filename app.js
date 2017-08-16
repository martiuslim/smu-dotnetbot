require('dotenv').config();
const builder = require('botbuilder');
const express = require('express');
const app = express();
let connector;

// Setup bot connector and server
connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});
app.listen(process.env.PORT, function() {
  console.log("%s started and listening on port %s..", 'mspbot', this.address().port); 
});
app.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector);

const intents = new builder.IntentDialog();
intents.matches(/^(hi|hello)/i, 'greeting');
intents.matches(/^(help|options)/i, 'helpDialog');
intents.onDefault(builder.DialogAction.send("Sorry, I didn't understand what you said! Please enter 'help' to get a list of commands that I understand :)"));

bot.dialog('/', intents);

bot.dialog('greeting', (session, args) => {
  session.send("Hello! I am smumspbot :)");
  session.endDialog("Type 'help' to see more commands!");
});

bot.dialog('helpDialog', (session, args) => {
  session.endDialog("Help dialog activated");
}).triggerAction({ matches: 'HelpIntent' })



// Welcomes new members to the group
bot.on('conversationUpdate', (message) => {
  if (message.membersAdded && message.membersAdded.length > 0) {
    let membersAdded = message.membersAdded
        .map((m) => {
          let isSelf = m.id === message.address.bot.id;
          return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
        })
        .join(', ');

    bot.send(new builder.Message()
      .address(message.address)
      .text('Welcome ' + membersAdded));
  }

  if (message.membersRemoved && message.membersRemoved.length > 0) {
    let membersRemoved = message.membersRemoved
        .map((m) => {
          let isSelf = m.id === message.address.bot.id;
          return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
        })
        .join(', ');

    bot.send(new builder.Message()
      .address(message.address)
      .text('The following members ' + membersRemoved + ' were removed or left the conversation :('));
  }
});