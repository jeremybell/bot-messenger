import { replyMessage, replyButton } from './facebook.js'
import config from './../config.js'
import recastai from 'recastai'

const client = new recastai.Client(config.recastToken, config.language)

function botFunction(event) {
  const senderID = event.sender.id
  const messageText = event.message.text
  const messageAttachments = event.message.attachments
  if (messageText) {
    client.textRequest(messageText, (res, err) => {
      if (err) {
        console.log(err)
      } else {
        /** CODE YOUR bot **/
        const intent = res.intent()
        replyMessage(senderID, intent) /** to reply a text message **/

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
      }
    })
  } else if (messageAttachments) {
    replyMessage(senderID, 'Message with attachment received')
  }
}

module.exports = {
  botFunction,
}
