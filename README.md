# Integration facebook messenger to Recast.AI bot

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

 [facebook]: https://git.recast.ai/tutorials/messenger/raw/4a923ca44b99881e6123f98c0b22fff189c03663/ressources/S%C3%A9lection_021.png "Creating you page"

![alt text][facebook]
* Choose the category of your page.
* Fill out the Facebook requirements step by step.

[facebook-set-up]: https://git.recast.ai/tutorials/messenger/raw/4a923ca44b99881e6123f98c0b22fff189c03663/ressources/S%C3%A9lection_022.png "Steup of your page"

![alt text][facebook-set-up]

## Set up your facebook account

* Log on to your Facebook Developers account.
* Create a new Facebook app.

[facebook-first]: https://git.recast.ai/tutorials/messenger/raw/feature/messenger/ressources/S%C3%A9lection_028.png "first page"
![alt text][facebook-first]


* Get your app secret and ID [Dashboard](https://developers.facebook.com/apps/258158857911674/dashboard/).

[facebook-app]: https://git.recast.ai/tutorials/messenger/raw/5478652c54e637582a9d910b0c20bf4a92bc4fe3/ressources/S%C3%A9lection_025.png "Creating you page"

![alt text][facebook-app]

* Get your page Token [Messanger](https://developers.facebook.com/apps/258158857911674/messenger/).

[facebook-pageToken]: https://git.recast.ai/tutorials/messenger/raw/5478652c54e637582a9d910b0c20bf4a92bc4fe3/ressources/S%C3%A9lection_026.png "Creating you page"

![alt text][facebook-pageToken]

## Start your bot in local
```bash
git clone "the link of the repo when created"
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
* Copy your appSecret `app secret of your Facebook app`
* Copy your page access Token `Token of your Page`
* Copy your validationToken `The token of your Webhook`
* Copy your serverURL  `ngrok https url`

```bash
vim src/config.js
```
```javascript
const config = {}

config.appSecret = 'APP_SECERT'
config.pageAccessToken = 'PAGE_TOKEN'
config.validationToken = 'ABCD1234'
config.serverURL = 'https://*******.ngrok.io'
config.recastToken = 'RECAST_TOKEN'
config.language = 'en'

module.exports = config

```

## Launching your server

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

[suscribe]: https://git.recast.ai/tutorials/messenger/raw/06c2447e6a7f6b0bf4aa7e45f93cac4d0d4ae6a8/ressources/S%C3%A9lection_024.png "Subscribe page"

![alt text][suscribe]

## Result

[result]: https://git.recast.ai/tutorials/messenger/raw/51ce277bbc3a44aee1ec96bbdce7e6ca909a57b9/ressources/S%C3%A9lection_023.png

![alt text][result]

## Your bot
* All you need for you bot is in the index.js file. The call to Recast.AI is is already done.
* replyMessage to send a basic text message.
* replyButton to send a basic button, if you whant a more complete button I advise to check the function replyButton in the bot.js file && the [Faceboook doc for button] (https://developers.facebook.com/docs/messenger-platform/send-api-reference#message).
```javascript
function botFunction(event) {
  const senderID = event.sender.id
  const messageText = event.message.text
  const messageAttachments = event.message.attachments
  if (messageText) {
    client.textRequest(messageText).then((res) => {
        /** CODE YOUR bot **/
        const intent = res.intent()
        if (intent !== null) {
        replyMessage(senderID, intent.slug) /** to reply a text message **/
			/**
			* Option of your button.
			* If you like more option check out ./facebook.js the function replyButton, and look up
			* the facebook doc for button https://developers.facebook.com/docs/messenger-platform/send-api-reference#message
			**/

        const option = {
          messageText: null,
          buttonTitle: 'My first button',
          buttonUrl: 'https://recast.ai/',
          buttonType: 'web_url',
          elementsTitle: 'Click on me',
        }
        replyButton(senderID, option) /** to reply a button **/
      } else {
      replyMessage(senderID, 'no intent match')
      }
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
