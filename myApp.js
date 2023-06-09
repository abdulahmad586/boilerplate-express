require('dotenv').config()
let express = require('express');
let app = express();

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

app.get("/:word/echo",(req,res)=>{
  
  res.json({word: req.params.word});
})

function loggerMiddleWare(req,res,next){
  console.log(req.method+" "+req.path+" - "+req.ip)
  next()
}

























 module.exports = app;
