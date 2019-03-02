const express = require('express')
const compression=require('compression');
const next = require('next')
var bodyParser = require('body-parser')
const routes=require('../routes');
const path=require('path');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app);
const authRoutes=require('./routes/auth');
const robotsOptions={
  root: path.join(__dirname,"../static"),
  headers:{
    'Content-Type':'text/plain;charset=UTF-8'
  }
}
app.prepare()
.then(() => {
  const server = express()
  //Compression middleware
  server.use(compression());
  //Body parser middleware
  server.use(bodyParser.json());
    //auth services
    server.use("/api/v1/auth",authRoutes);
  //robot.txt
  server.get('/robots.txt',(req,res)=>{
    return res.status(200).sendFile('robots.txt',robotsOptions);
  })

  //all types of routes
  server.get('*', (req, res) => {
    return handle(req, res)
  })
  const PORT=process.env.PORT||3000
 // ERROR HANDLING IN AUTHORISATION
  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title:'unauthorized',detail:'unauthorized access'});
    }
  });
  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on port '+PORT)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})