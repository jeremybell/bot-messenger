import express from 'express'
import config from './../config.js'
import bodyParser from 'body-parser'
import { handleMessage } from './bot.js'

const facebookConfig = {
  pageAccessToken: config.pageAccessToken,
  validationToken: config.validationToken,
}

/*
* Creaction of the server
*/

const app = express()
app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())

/*
* connect your webhhook
*/

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
  req.query['hub.verify_token'] === facebookConfig.validationToken) {
    console.log('Validating webhook')
    res.status(200).send(req.query['hub.challenge'])
  } else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
})

/*
* Take care of the messages
*/

app.post('/webhook', (req, res) => {
  const data = req.body
  if (data.object === 'page') {
    data.entry.forEach(pageEntry => {
      pageEntry.messaging.forEach(messagingEvent => {
        if (messagingEvent.message) {
          handleMessage(messagingEvent)
        }
      })
    })
    res.sendStatus(200)
  }
})

app.listen(app.get('port'), () => {
  console.log('Our bot is running on port', app.get('port'))
})
