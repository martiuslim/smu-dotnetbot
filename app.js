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
bot.dialog('/', (session) => {
  switch(session.message.text) {
    case "/start": {
      session.beginDialog('greeting');
      break;
    }
    case "/roll": {
      session.send("Feature in progress! Stay tuned..");
      break;
    }
    case "/about": {
      session.beginDialog('about');
      break;
    }
    case "/help": {
      session.beginDialog('help');
      break;
    }
    default: {
      session.beginDialog('default');
    }
  }
});

bot.dialog('greeting', (session, args) => {
  session.endDialog("Hello! I am DotNetBot, your friendly neighbourhood chatbot built for the SMU Microsoft Student Community.  \nType '/help' to see what else I can do!");
});

bot.dialog('about', (session, args) => {
  session.endDialog("Hi there! I'm DotNetBot, a chatbot built for the SMU Microsoft Student Community (SMU DotNet Society) by our friendly Microsoft Student Partners.  \nI'm still young and learning how to do new things!  \nIf you have any feedback or suggestions to help me improve, please let @martiuslim know and he will make me better! Thank you :)");
});

bot.dialog('help', (session, args) => {
  session.endDialog("I'm glad you asked! Here's a list of what I can do, just click on any of them to get started  \n%s  \n%s  \n%s  ", 
    '/roll', 
    '/about', 
    '/help'
  );
}).triggerAction({ matches: 'HelpIntent' })

bot.dialog('default', (session, args) => {
  session.endDialog("Sorry, I didn't understand what you said. Please enter '/help' to get a list of commands that I understand :)");
});



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
      .text('Welcome %s to SMU\'s Microsoft Student Community!', membersAdded));
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