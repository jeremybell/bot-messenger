# Start coding your bot: Recast.AI + Facebook messenger

* Here, you'll learn how to build a bot with Facebook Messenger and Recast.AI.
* If you don't know how to use Recast.AI, you can check this SDK first:  [Recast.AI-nodejs-SDK](https://github.com/RecastAI/SDK-NodeJs)

## Requirements
* Create an account on [Recast.AI](https://recast.ai/signup).
* Create an account on [Facebook Developers](https://developers.facebook.com/). (same account than your personal Facebook account)

## Set up your Recast.AI account

##### Create your bot

* Log into your [Recast.AI](https://recast.ai/login) account.
* Create a new bot.

##### Get your token

* In your profile, click your bot.
* In the tab-menu, click on the the little screw.
* Here is the `request access token` you will need to configure your bot.

## Create your facebook page
* [Create your page](https://www.facebook.com/pages/create/?ref_type=logout_gear).

 [facebook]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_021.png "Creating you page"

![alt text][facebook]
* Choose the category of your page.
* Fill out the Facebook requirements step by step.

[facebook-set-up]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_022.png "Steup of your page"

![alt text][facebook-set-up]

## Set up your facebook account

* Log on to your Facebook Developers account.
* Create a new Facebook app.

[facebook-first]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_028.png "first page"
![alt text][facebook-first]


* Get your app secret and ID [Dashboard](https://developers.facebook.com/apps/258158857911674/dashboard/).

[facebook-app]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_025.png  "Creating you page"

![alt text][facebook-app]

* Get your page Token [Messanger](https://developers.facebook.com/apps/258158857911674/messenger/).

[facebook-pageToken]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_026.png "Creating you page"

![alt text][facebook-pageToken]

## Start your bot in local
```bash
git clone https://github.com/RecastAI/bot-messenger.git
```

#### Ngrok

* Download the appropriate version of [Ngrok](https://ngrok.com/download).
* Open a new tab in your terminal:
```
./ngrok http 5000
```
* Copy past the ``` https://*******ngrok.io``` you get, you will need it for the next step.
* Leave your Ngrok serveur running.

## Complete the config.js

* Copy your Recast.AI `Recast.AI access token`
* Copy your page access Token `Token of your Page`
* Copy your validationToken `The token of your Webhook`

```bash
vim config.js
```
```javascript
const config = {}

config.pageAccessToken = 'PAGE_TOKEN'
config.validationToken = 'ABCD1234'
config.recastToken = 'RECAST_TOKEN'
config.language = 'en'

module.exports = config

```

## Launching your Bot

* make sure to have ngrok launched and the correct URL in you config file.

```bash
npm install
npm start
```

#### Config webhook

* go back to the Facebook Developer page and add a new webhook.

[webhook]: https://blog.recast.ai/wp-content/uploads/2016/09/S%C3%A9lection_020.png "Webhook page"

![alt text][webhook]
* Subscribe your page to the webhook you just created.

[suscribe]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_024.png "Subscribe page"

![alt text][suscribe]

## Result

[result]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_023.png

![alt text][result]

## Your bot

#### SDK usage
* All you need for you bot is in the bot.js file. The call to Recast.AI is already done.
* ```client.textConverse(message.body, { conversationToken: senderID })``` To use this method you need to pass the user's input, and  a unique conversation token. This token can be the senderId of the messenger chat. This token will create for each users a specific conversation with your bot.
* ```res.reply()``` To get the first reply of your bot.
* ```res.replies``` To get an array of all your replies.
* ``` res.action``` Get the object action. When an action is complete you will have the ```action.done = true ``` and you will be able to trigger a specific behavior.

#### Start-kit helpers
* ```replyMessage(sendeID,YOUR_TEXT)``` to send a basic text message.
* ```replyButton(senderID, options)``` to send a basic button, if you whant a more complete button I advise to check the function replyButton in the bot.js file && the [Faceboook doc for button] (https://developers.facebook.com/docs/messenger-platform/send-api-reference#message).

```javascript
function handleMessage(event) {
  const senderID = event.sender.id
  const messageText = event.message.text
  const messageAttachments = event.message.attachments
  if (messageText) {
    client.textConverse(messageText, { conversationToken: senderID }).then((res) => {
      const reply = res.reply()               /* To get the first reply of your bot. */
      const replies = res.replies             /* An array of all your replies */
      const action = res.action               /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */

      if (!reply) {
        const options = {
          messageText: null,
          buttonTitle: 'My first button',    /* Option of your button. */
          buttonUrl: 'https://recast.ai/',   /* If you like more option check out ./facebook.js the function replyButton, and look up */
          buttonType: 'web_url',             /* the facebook doc for button https://developers.facebook.com/docs/messenger-platform/send-api-reference#message */
          elementsTitle: 'I don\'t get it :(',
        }
        replyButton(senderID, options)        /* to reply a button */
      } else {
       if (action && action.done === true) {
         console.log('action is done')
        // Use external services: use res.memory('knowledge') if you got a knowledge from this action
       }
       replies.forEach(rep => replyMessage(senderID, rep))
    }).catch(err => {
      console.log(err)
    })
  } else if (messageAttachments) {
    replyMessage(senderID, 'Message with attachment received')
  }
}
```
* Have fun coding your bot! :)

## Author

Henri Floren - Recast.AI
henri.floren@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
