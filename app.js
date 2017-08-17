require('dotenv').config();
const builder = require('botbuilder');
const emoji = require('node-emoji');
const express = require('express');
const firebase = require('firebase');

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

firebase.initializeApp(config);
const app = express();
const db = firebase.database();

// Setup bot connector and server
app.listen(process.env.PORT, function() {
  console.log("%s started and listening on port %s..", 'mspbot', this.address().port); 
});
app.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector);
bot.dialog('/', (session) => {
  switch(session.message.text.toLowerCase()) {
    case 'hi':
    case 'hello':
    case '/start': 
    case '/start@smumspbot': {
      session.beginDialog('greeting');
      break;
    }

    case '/me':
    case '/me@smumspbot': {
      session.message.source === 'telegram' && session.chat.type === 'private' ? session.beginDialog('me') : session.endDialog("Hi! Please use this command in a private chat with me %s", emoji.get('speak_no_evil'));
      break;
    }

    case '/about':
    case '/about@smumspbot': {
      session.beginDialog('about');
      break;
    }

    case '/dotnet':
    case '/dotnet@smumspbot': {
      session.beginDialog('dotnet');
      break;
    }

    case '/fortunecookie':
    case '/fortunecookie@smumspbot': {
      session.beginDialog('fortunecookie');
      break;
    }

    case '/games':
    case '/games@smumspbot': {
      // session.beginDialog('games');
      break;
    }

    case '/help':
    case '/help@smumspbot': {
      session.beginDialog('help');
      break;
    }

    default: {
      session.beginDialog('default');
    }
  }
});

bot.dialog('greeting', (session, args) => {
  session.endDialog("Hello! I am **DotNetBot** %s, your friendly neighbourhood chatbot built for the **SMU Microsoft Student Community**.  \n\nSend */dotnet* to learn more about what DotNet Society and our Microsoft Student Partners do or */help* to see what else I can do!", emoji.get('robot_face'));
});

bot.dialog('me', [
  (session, args) => {
    if (!session.userData.name) {
      builder.Prompts.choice(session, "Hi there and nice to meet you! I am **DotNetBot** and I want to get to know you better :D  \n", "sure!|not right now.. ):");
    } else {
      session.send(
        "Hi again %s!  \n\nYour current profile is:  \nName: %s  \nEmail: %s  \nFaculty: %s  \nYear Of Study: %i", 
        session.userData.name, 
        session.userData.name,
        session.userData.email, 
        session.userData.faculty, 
        session.userData.yearOfStudy
      );
      builder.Prompts.confirm(session, "Would you like to change your details?  \n(Reply with 'yes' or 'no')");
    }
  },
  (session, results) => {
    results.response.index === 0 || (results.response.index !== 1 && results.response) ? session.beginDialog('profile') : session.endDialog("I'll see you around then!");
  }
]);

bot.dialog('profile', [
  (session, args) => {
    session.send("Nice! I'll be asking you a series of questions. All you have to do is to reply me like you would to someone else and we're good!");
    builder.Prompts.text(session, "What's your name?");
  },
  (session, results) => {
    session.userData.name = results.response;
    builder.Prompts.text(session, "Hi " + session.userData.name + "! Next, what's your SMU email address?");
  },
  (session, results) => {
    session.userData.email = results.response;
    builder.Prompts.text(session, "Wow " + session.userData.email + "! I wish I had thought of that first! What are you studying in SMU?");
  },
  (session, results) => {
    session.userData.faculty = results.response;
    builder.Prompts.number(session, "Cool! Maybe one day I'll be as smart as you! What year of study are you currently at?");
  },
  (session, results) => {
    session.userData.yearOfStudy = results.response;
    session.send(
      "Great! Here's your profile:  \nName: %s  \nEmail: %s  \nFaculty: %s  \nYear Of Study: %i", 
      session.userData.name, 
      session.userData.email, 
      session.userData.faculty, 
      session.userData.yearOfStudy
    );
    session.endDialog("Ping me again if I got your details wrongly %s", emoji.get('innocent'));
  }
]);

bot.dialog('about', (session, args) => {
  session.endDialog("Hi there! I'm **DotNetBot**, a chatbot built for the **SMU Microsoft Student Community (SMU DotNet Society)** by our friendly *Microsoft Student Partners*. I'm still young and learning how to do new things!  \n\nIf you find any bugs or have any feedback to help me improve, please let @martiuslim know and he will make me better! Thank you %s", emoji.get('smile'));
});

bot.dialog('dotnet', (session, args) => {
  session.send("Hey! We are **DotNet Society** and we are mainly a bunch of technology enthusiasts with a passion for Microsoft Technology %s.  \n\nOur friendly **Microsoft Student Partners** conduct workshops and host events so that we can all learn and grow together!  \n\nIf **learning new technologies** and **building cool stuff** sounds fun to you, or if you want to become a Microsoft Student Partner yourself, please feel free to join us and spread the word!", emoji.get('v'));
  session.endDialog("We'd love you to join us at our **SMU Microsoft Student Community** here: %s", 'https://t.me/joinchat/BTX9YUMEqizbHZeYUhNdPA');
});

bot.dialog('fortunecookie', (session, args) => {
  session.send("Eating your fortune cookie! %s  \nYour fortune is..", emoji.random().emoji);
  session.endDialog(fortunes);
});

bot.dialog('games', [
  (session, args) => {
    builder.Prompts.choice(session, "Let's play a game!  \n", 'Flip a Coin|Roll Dice|Quit');
  }, 
  (session, results) => {
    switch (results.response.index) {
      case 0: {
        session.endDialog("*Flipping a coin..*  \nAh! I have not learnt how to do that yet. Check back again soon!");
        break;
      }
      case 1: {
        session.endDialog("*Rolling some dice..*  \nAh! I have not learnt how to do that yet. Check back again soon!");
        break;
      }
      default: {
        session.endDialog("Thanks for playin'! See you around %s", emoji.get('grin'));
      }
    }
  }
]);

bot.dialog('help', (session, args) => {
  session.endDialog("I'm glad you asked! Here's a list of what I can do, just click on any of them to get started %s  \n%s  \n%s  \n%s  \n%s  \n%s  ", 
    emoji.get('muscle'),
    '/me (help me get to know you better!)',
    '/about (learn more about me and how you can help make me better!)',
    '/dotnet (learn more about DotNet Society and our SMU Microsoft Student Community!)',
    '/fortunecookie (get your fortune.. after I eat your cookie ' + emoji.get('smiling_imp') + ')',
    '/games (play some simple games with me!)'
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
      .text("Welcome %s to SMU's Microsoft Student Community, hooray! %s", membersAdded, emoji.random().emoji));
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
      .text("Goodbye %s %s", membersRemoved, emoji.get('cry')));
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

function writeUserData(userId, name, email, faculty, yearOfStudy) {
  db.ref('users/' + userId).set({
    name,
    email,
    faculty,
    yearofStudy
  });
};