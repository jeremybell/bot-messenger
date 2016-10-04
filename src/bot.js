import { replyMessage, replyButton } from './facebook.js'
import config from './../config.js'
import { Client } from 'recastai'

const client = new Client(config.recastToken, config.language)

  function botFunction(event) {
    const senderID = event.sender.id
      const messageText = event.message.text
      const messageAttachments = event.message.attachments
      if (messageText) {
        client.converse(messageText, senderID).then((res) => {
          /** CODE YOUR bot **/
          const replies = res.replies() /* To get a array of the response of your bot. */
          const action = res.action() /*Get the object action.*/

          console.log(action) /*You can use 'action.done' to trigger a specification action when it's at true.*/
          if(!replies) {
            replies.forEach(replie => {
              replyMessage(senderID, replie) /** to reply a text message **/
            })
          } else {
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
        }).catch(err => {
          console.log(err)
        })
      } else if (messageAttachments) {
        replyMessage(senderID, 'Message with attachment received')
      }
  }
module.exports = {
  botFunction,
}
