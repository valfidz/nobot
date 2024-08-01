import express from 'express'
import { startSchedule } from './bot.js';

const app = express()
const port = 3370

app.get('/', (req, res) => {
  res.send('This is NoBot 1.0')
})

startSchedule()

app.listen(port, () => {
  console.log(`NoBot listening on port ${port}`)
})