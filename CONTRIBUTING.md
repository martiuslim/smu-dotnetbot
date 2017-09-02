# SMU DotNet Bot
You've found the GitHub repository that houses the source for SMU DotNet Bot, yay! SMU DotNet Bot is built using Microsoft Bot Framework on Node.js.

## Contribute to SMU DotNet Bot
Thank you for your interest in SMU DotNet Bot :smile:
- [Contributing](#contributing)
- [Getting Started](#getting-started)
  - [Software Prerequisites](#software-prerequisites)
  - [Developing SMU DotNet Bot](#developing-smu-dotnet-bot)
  - [Documentation and Useful Links](#documentation-and-useful-links)

## Contributing
To contribute code or documentation to SMU DotNet Bot, you need to [fork this repository](https://help.github.com/articles/fork-a-repo/) and submit a [pull request](https://help.github.com/articles/about-pull-requests/) to our `development` branch for the features, bug fixes or documentation that you're proposing.   

You can also contribute through suggesting new features that you'd like to see or logging bugs through [opening an issue here](https://github.com/martiuslim/smu-dotnetbot/issues).

## Getting Started
To start developing on SMU DotNet Bot, you will want to be able to run and test the bot locally.

### Software Prerequisites
You will need [git](https://git-scm.com/downloads) and a recent version of [node.js](https://nodejs.org/en/download/) (downloading the `LTS` version will be good enough). [npm](https://docs.npmjs.com/getting-started/what-is-npm) comes installed with Node but you should update it using `npm install npm@latest -g` as `npm` gets updated more frequently than Node does.

Next, fork this repository then clone it to your desktop using `git clone <your repository url>`. Open a terminal, cmd or powershell window in the directory of the repository then run `npm install` to install the required dependencies. Optional: You may also want to install [nodemon](https://nodemon.io/) as it helps you automatically restart the bot when you make changes.

You will also need the [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator) to help you debug the bot locally. The latest Windows installer can be [found here](https://emulator.botframework.com/) while download packages for Mac and Linux can be [found here](https://github.com/Microsoft/BotFramework-Emulator/releases).

Lastly, we recommend [Visual Studio Code](https://code.visualstudio.com/) as your code editor as it has inbuilt support for Microsoft Bot Framework as well as many useful extensions that you can try out.

### Developing SMU DotNet Bot
Open a terminal window where your repository is, then run `node app.js` or `nodemon app.js` depending on whether you installed `nodemon` or not. Start up your Bot Framework Emulator and ensure that the URL points to `http://localhost:3978/api/messages`. Leave the `Microsoft App ID` and `Microsoft App Password` blank then click connect to engage the bot.

### Documentation and Useful Links  
Read more about Microsoft Bot Framework [here](https://docs.microsoft.com/en-us/bot-framework/#pivot=main&panel=overview).  
- [Microsoft Bot Framework Chat Library Reference (API Docs)](https://docs.botframework.com/en-us/node/builder/chat-reference/modules/_botbuilder_d_.html)
- [Bot Builder GitHub Repository](https://github.com/Microsoft/BotBuilder)
- [Bot Builder Code Samples](https://github.com/Microsoft/BotBuilder-Samples)
- [Nodejs Code Samples](https://github.com/Microsoft/BotBuilder/tree/master/Node/examples)
