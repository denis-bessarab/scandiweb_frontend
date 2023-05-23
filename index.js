import express from 'express'
import { dirname } from 'path'

const app = express()

const __dirname = dirname('/')

app.use(express.static(__dirname + 'dist/'))
app.listen(process.env.PORT || 8080)
