import config from './../config.js'
import request from 'request'


/*
* call to facebbok to send the message
*/

function sendMessage(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: config.pageAccessToken },
    method: 'POST',
    json: messageData,
  }, (error, response) => {
    if (!error && response.statusCode === 200) {
      console.log('All good job is done')
    }
  })
}

/*
* type of message to send back
*/

function replyMessage(recipientId, messageText) {
  let messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  }
  sendMessage(messageData)
}

function replyButton (recipientId, option) {
  let messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: option.elementsTitle,
            buttons: [{
              type: option.buttonType,
              url: option.buttonUrl,
              title: option.buttonTitle,
            }],
          }],
        },
      },
    },
  }
  sendMessage(messageData)
}


module.exports = {
  replyMessage,
  replyButton,
}
