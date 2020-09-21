require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT secret key was not provided')
  process.exit(1)
}

if (!process.env.DB_ACCESS_STRING) {
  console.error('FATAL: MongoBD connection string was not provided')
  process.exit(1)
}

mongoose.connect(process.env.DB_ACCESS_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('DATABASE CONNECTION OK.');
  })
  .catch(err => {
    console.log('DATABASE CONNECTION FAIELD.');
  })

app.use(express.json())
app.use(routes)

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})
