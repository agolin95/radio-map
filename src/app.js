const express = require('express')
const path = require('path')
const RadioBrowser = require('radio-browser')

const app = express()
const port = process.env.PORT || 8080

// Set Static Files Directory
app.use(express.static(path.join(__dirname, 'static')))

// Set Views Template Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Set Routes
app.get('/', (req, res) => {
  const filter = {
    by: 'country',
    searchterm: 'The United States Of America',
    limit: 1000
  }
  RadioBrowser.getStations(filter).then(
    function (data) {
      res.render('index', { data })
    }
  ).catch(
    function (error) {
      console.error(error)
    }
  )
})

// Listen
app.listen(port, () => {
  console.info(`App listening on port ${port}`)
  console.info('Debugs')
})
