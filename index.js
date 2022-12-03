const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes.js')
const fileRouter = require('./routes/file.routes.js')
const corsMiddleware = require('./middleware/cors.middleware.js')
const filePath = require('./middleware/filepath.middleware')
const path = require('path')

const app = express()
const PORT = process.env.PORT || config.get('serverPort')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePath(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get('DB_URL'))

    app.listen(PORT, console.log(`Server started on PORT: ${PORT}`))
  } catch (e) {
  }
}

start()
