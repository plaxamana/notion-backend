const express = require('express');
const getEvents = require('./services/notion');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express()

app.use(cors())

app.get('/events', async (req, res) => {
  const events = await getEvents()
  res.json(events)
})

app.listen(PORT, console.log(`Server started on port: ${PORT}`))

