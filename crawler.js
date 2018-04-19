let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// respond with "hello world" when a GET request is made to the homepage
const index = require('./router/index')
const sendEmail =require('./router/email')
const port=60000
let session = require('express-session')
let cookieParser = require('cookie-parser');
let mysql =require('./router/mysql')
mysql()
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))// for parsing application/x-www-form-urlencoded
app.use(session({
    secret: '12345',
    name: 'session',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
     cookie: {maxAge: 60*1000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: false,
}))
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get('Origin'));
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get('/',function (req,res,next) {
  next()
})
app.use('/api',index)
let p={
  username:'5625140411111112@qq.com',
  verifyCode:'XED145',
   password:'123456',
   second_password:'123456',
   sex:'man'
}
app.listen(port,function(err){
  if(err){
    console.error(err);
  }else {
    console.log('listening to '+port)
    console.info("服务器起动成功..");
  }
});
