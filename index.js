import express from 'express'
import { dirname } from 'path'
import * as path from "path";

const app = express()

const __dirname = dirname('/')

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 8080)
