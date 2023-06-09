require('dotenv').config()
const bodyParser = require("body-parser");

let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(loggerMiddleWare);
app.use("/public", express.static(__dirname+"/public"));

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/views/index.html");
})

app.get("/json", (req,res)=>{
  const message = "Hello json";
  const messageStyle = process.env.MESSAGE_STYLE;
  
  res.json({message: messageStyle == "uppercase" ? message.toUpperCase() : message });
})

app.get("/now",(req,res,next)=>{
  req.time = (new Date()).toString();
  next();
}, (req,res)=>{
  res.json({time: req.time });
})

app.get("/name",(req,res)=>{
  res.json({name: req.query.first+" "+req.query.last });
})

app.get("/name",(req,res)=>{
  res.json({name: req.body.first+" "+req.body.last });
})

app.get("/:word/echo",(req,res)=>{
  res.json({echo: req.params.word});
})

function loggerMiddleWare(req,res,next){
  console.log(req.method+" "+req.path+" - "+req.ip)
  next()
}

























 module.exports = app;
