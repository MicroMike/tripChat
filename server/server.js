const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const port = process.env.PORT || 3000
const mongoURL = process.env.MONGO_URL || 'mongodb://heroku_vf9rm9lf:mnqqqt2li0sfn67d057ateg70b@ds213759.mlab.com:13759/heroku_vf9rm9lf'

// MongoDB Connection
mongoose.connect(mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!') // eslint-disable-line no-console
    throw error
  }
})

import router from './routes'

const server = express()

server.use('/api', router)
// server.use(express.static(path.resolve(__dirname, '../.next/static')))

server.listen(port, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:' + port)
})