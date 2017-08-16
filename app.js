require('dotenv').config();
const builder = require('botbuilder');
const emoji = require('node-emoji');
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
    case "/msp": {
      session.beginDialog('msp');
      break;
    }
    case "/fortunecookie": {
      session.beginDialog('fortunecookie');
      break;
    }
    case "/games": {
      session.beginDialog('games');
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
  session.endDialog("Hello! I am DotNetBot %s, your friendly neighbourhood chatbot built for the SMU Microsoft Student Community.  \nSend '/msp' to learn more about what DotNet Society and our Microsoft Student Partners do or '/help' to see what else I can do!", emoji.get('robot_face'));
});

bot.dialog('msp', (session, args) => {
  session.endDialog("Feature in progress! Stay tuned..");
});

bot.dialog('fortunecookie', (session, args) => {
  session.send("Eating your fortune cookie! %s  \nYour fortune is..", emoji.random().emoji);
  session.endDialog(fortunes);
});

bot.dialog('games', (session, args) => {
  session.endDialog("Feature in progress! Stay tuned..");
});

bot.dialog('about', (session, args) => {
  session.endDialog("Hi there! I'm DotNetBot, a chatbot built for the SMU Microsoft Student Community (SMU DotNet Society) by our friendly Microsoft Student Partners.  \nI'm still young and learning how to do new things!  \nIf you have any feedback or suggestions to help me improve, please let @martiuslim know and he will make me better! Thank you %s", emoji.get('smile'));
});

bot.dialog('help', (session, args) => {
  session.endDialog("I'm glad you asked! Here's a list of what I can do, just click on any of them to get started %s  \n%s  \n%s  \n%s  \n%s  \n%s  ", 
    emoji.get('muscle'),
    '/msp',
    '/fortunecookie',
    '/games', 
    '/about', 
    '/help'
  );
});

bot.dialog('default', (session, args) => {
  session.endDialog("Sorry, I didn't understand what you said. Please enter '/help' to get a list of commands that I understand %s", emoji.get('thinking_face'));
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
      .text("Welcome %s to SMU's Microsoft Student Community, hooray!", membersAdded));
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
      .text("Goodbye " + membersRemoved + " :("));
  }
});

const fortunes = [
  "You will always be surrounded by true friends.",
  "You are never selfish with your advice or your help.",
  "Compassion will cure more then condemnation.",
  "The finest men like the finest steels have been tempered in the hottest furnace.",
  "Love can turn a cottage into a golden palace.",
  "Do not fear what you don't know.",
  "Never give up. You're not a failure if you don't give up.",
  "Rarely do great beauty and great virtue dwell together as they do in you.",
  "Don't worry, half the people you know are below average.",
  "Good things take time.",
  "The best is yet to come.",
  "Anyone who dares to be, can never be weak.",
  "Stop wishing. Start doing.",
  "Things may come to those who wait, but only the things left by those who hustle.",
  "You will live long and enjoy life.",
  "Friends long absent are coming back to you.",
  "Sometimes the object of the journey is not the end, but the journey itself.",
  "Be direct, usually one can accomplish more that way.",
  "The Wheel of Good Fortune is finally turning in your direction!",
  "The eyes believe themselves; the ears believe other people."
];