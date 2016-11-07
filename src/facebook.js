import config from './../config.js'
import request from 'request'


/*
* call to facebbok to send the message
*/

function sendMessage(messageData) {
  return new Promise((resolve, reject) => {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: config.pageAccessToken },
      method: 'POST',
      json: messageData,
    }, (error, response) => {
      if (!error && response.statusCode === 200) {
        console.log('All good job is done')
        resolve()
      } else {
        reject(error)
      }
    })
  })
}

/*``
* type of message to send back
*/

function replyMessage(recipientId, messageText) {
  return new Promise((resolve, reject) => {

    const messageData = {
      recipient: {
        id: recipientId,
      },
      message: {
        text: messageText,
      },
    }
    sendMessage(messageData).then(() => {
      resolve()
    }).catch( err => {
      reject(err)
    })
  })
}

function replyButton(recipientId, option) {
  const messageData = {
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
