const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./router/router");

require('./db/conn')
require('dotenv').config()

app.use(bodyParser.json({ limit: '500mb' }));
//parsing-req.body-urlQueries-into-query-string
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, authtoken, Accept, authorization')
    res.header('Access-Control-Allow-Methods', '*')
    // console.log(`Request URL [${req.originalUrl}]`)
    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  })
  

app.use("/user", userRouter);



app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})

