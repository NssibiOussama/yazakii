const express = require('express')
const app = express()
const morgan = require('morgan')
const http = require('http');
const body_parser = require('body-parser')
const authRouter = require('./Routes/auth')
const materielRouter = require('./Routes/materiel')
const userRouter = require('./Routes/user')
const mdpRouter =require('./Routes/mdp')
const demandeRouter =require('./Routes/demande')









app.use(express.json())
app.use(body_parser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});



app.use('/api', authRouter);
app.use('/materiel',materielRouter)
app.use('/user',userRouter)
app.use('/api/mdp',mdpRouter)
app.use('/demande',demandeRouter)





const server = http.createServer(app)
const port = process.env.port || 3000
server.listen(port, () => console.log("App working on port" + port + "..."))  