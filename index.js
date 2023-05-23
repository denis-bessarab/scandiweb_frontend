import express from 'express'
import { dirname } from 'path'
import * as path from "path";
import * as fs from "fs";

const app = express()

const __dirname = dirname('/')

app.use(express.static(path.join(__dirname, 'dist/')));
app.use(express.static(path.join(__dirname, 'assets/')));
app.get('/', (req, res) => {
    fs.readFile('dist/index.html',(err,data) => {
        if(err) throw err
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.end()
        return res
    })
});

app.listen(process.env.PORT || 8080)
