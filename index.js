const express = import ('express')
const serveStatic = import('serve-static')
const path = import('path')

const app = (await express)()

app.use('/',(await serveStatic)(path.join(__dirname,'/dist')))

app.listen(443)

