const express = require('express')
const path = require('path')
const stations = require('./stations.json')
// const RadioBrowser = require('radio-browser')

const app = express()
const port = process.env.PORT || 8080

// Set Static Files Directory
app.use(express.static(path.join(__dirname, 'static')))

// Set Views Template Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Set Routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/stations', (req, res) => {
  // const filter = {
  //   limit: 500,
  //   by: 'country',
  //   searchterm: 'The United States Of America'
  // }
  // RadioBrowser.getStations(filter)
  //   .then(function (stations) {
  //     res.json(stations)
  //   })
  //   .catch(function (err) {
  //     console.error('Error getting stations from radio-browser: ', err)
  //     res.status(500).json({ err: 'Error getting stations from radio-browser' })
  //   })
  res.json(stations)
})

// Listen
app.listen(port, () => {
  console.info(`App listening on port ${port}`)
})
