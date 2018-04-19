let express = require('express');
let app = express();
let router = express.Router();
let methods=require('./public.js')
let kankan_methods=require('./kankan_pubic')
let superagent  =require('superagent')   //一个类似Ajax为了访问网页返回数据的包
let cheerio = require('cheerio');
let send_email=require('./email')
let mysql_methods=require('./mysql_methods')
router.get('/get-last-episode',function (req,res) {
  let id=req.query.id
  methods.getLastEpisode(id).then(function (nameArr) {
    res.json({nameData:nameArr})
  }).catch(function (code) {
    res.send(code)
  })
})
router.get('/converImg',function (req,res) {
  let href=req.query.href
  let pages=req.query.pages||0
methods.convertImg(href,pages).then(function (img) {
  if(img.split('/')[4]=='null'){
    res.send(404)
  }else {
    res.send(img)
  }
}).catch(function (code) {
  res.send(code)
})
})
router.get('/get-comic-name',function (req,res) {
  methods.getName(req.query.id).then(function (name) {
    res.send(name)
  })

})
router.get('/search',function (req,res) {
 let key=req.query.key
  kankan_methods.search(key).then(function (data) {
    res.send(data)
  })
})
router.get('/get-episode',function (req,res) {
  let id=req.query.id
  kankan_methods.getEpisode(id).then(function (data) {
    res.send(data)
  })
})
router.get('/get-pages',function (req,res) {
  let id=req.query.id,episodeId=req.query.episodeId,page=req.query.page
kankan_methods.getPage(id,episodeId,page).then(function (data) {
  res.send(data)
}).catch(
  ()=>res.send('notFound')
)
})
router.get('/transfer',function (req,res) {
  let url=req.query.url
  let md5=req.query.md5
  let cid=req.query.cid
  let q=url+'?md5='+md5+'&cid='+cid
kankan_methods.sendImg(q).then(function (data) {
  res.send(data)
})
})
router.get('/homepage',function (req,res) {
  let s=[
    {name:'东京喰种RE',id:16058,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524006448358&di=fc2f89a4d3ac55937b0fc21a812c3655&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170627%2F7fff2c843c7a4baa84d5a1a09f291f67_th.jpg'},
    {name:'JOJO的奇妙冒险',id:1668,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524048459760&di=2babc16676c316a146894ea0f69e1c41&imgtype=0&src=http%3A%2F%2Ftp.lingyu.me%2Fwp-content%2Fuploads%2F2015%2F12%2F20151208121619622.jpg'},
    {name:'一拳超人',id:7580,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524006391611&di=5e2ba8a206864fa764d14b59dfac2d15&imgtype=0&src=http%3A%2F%2Fwww.285868.com%2Fuploadfile%2F2016%2F1110%2F20161110041647460.jpg'},
    {name:'博人传BORUTO',id:20224,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524006705573&di=55fbd89e38fe53551b53df3070b4c1de&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F371dfa993a3986799ba384266c7400813d61c7dc.jpg'},
    {name:'拳愿阿修罗',id:15248,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524007972627&di=dcc96491964062adaa57f6ae5aff7f47&imgtype=0&src=http%3A%2F%2Fwww.bioyunhan.com%2Fupload%2Fimg%2FpoqO0IUck4Gw3hfPpivZN53vLoQPoetXo3s0VX4CEUdaUZS5fiR5JhLHesOK9GPleazTCkDS3t9kU1x3zVN1Uth84XjH5vVgV9dDHwYspTT89to.jpg'},
  ]
  let r=[
    {name:'赌博堕天录-和也篇',id:14776,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524048459760&di=2babc16676c316a146894ea0f69e1c41&imgtype=0&src=http%3A%2F%2Ftp.lingyu.me%2Fwp-content%2Fuploads%2F2015%2F12%2F20151208121619622.jpg'},
    {name:'JOJO的奇妙冒险',id:1668,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524048459760&di=2babc16676c316a146894ea0f69e1c41&imgtype=0&src=http%3A%2F%2Ftp.lingyu.me%2Fwp-content%2Fuploads%2F2015%2F12%2F20151208121619622.jpg'},
    {name:'一拳超人',id:7580,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524006391611&di=5e2ba8a206864fa764d14b59dfac2d15&imgtype=0&src=http%3A%2F%2Fwww.285868.com%2Fuploadfile%2F2016%2F1110%2F20161110041647460.jpg'},
    {name:'东京喰种RE',id:16058,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524006448358&di=fc2f89a4d3ac55937b0fc21a812c3655&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170627%2F7fff2c843c7a4baa84d5a1a09f291f67_th.jpg'},
    {name:'博人传BORUTO',id:20224,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524006705573&di=55fbd89e38fe53551b53df3070b4c1de&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F371dfa993a3986799ba384266c7400813d61c7dc.jpg'},
    {name:'拳愿阿修罗',id:15248,swiper:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524007972627&di=dcc96491964062adaa57f6ae5aff7f47&imgtype=0&src=http%3A%2F%2Fwww.bioyunhan.com%2Fupload%2Fimg%2FpoqO0IUck4Gw3hfPpivZN53vLoQPoetXo3s0VX4CEUdaUZS5fiR5JhLHesOK9GPleazTCkDS3t9kU1x3zVN1Uth84XjH5vVgV9dDHwYspTT89to.jpg'},
  ]
  for(let arr of s){
      arr['cover']='https://cf.hamreus.com/cpic/h/'+arr.id+'.jpg'
  }
  for(let arr of r){
    arr['cover']='https://cf.hamreus.com/cpic/h/'+arr.id+'.jpg'
  }
  res.send({index:s,recommend:r})
})
router.get('/getBdImg',function (req,res) {
  let word=req.query.word
  kankan_methods.getBDImg(word).then(function (img) {
    res.send(img)
  })
})
router.post('/verify-emali',function (req,res) {
    let name=req.body.name
    let nowTime=req.body.nowTime
    let data= new Date()
    let time =data.getTime()

    if(name.length){
      send_email(name,'欢迎注册vovking(#^.^#)','O(∩_∩)O','<div style="text-align: center;width: 100%"><b>1分钟内点击</b><a href="http:hao123.com">11111</a></div>')
    }

  console.log(req.body)
})
router.get('/checkUserNameHaveBeen',function (req,res,next) {
  let name =req.query.name
  mysql_methods.MySql_where('username',name).then(function (val) {
    console.log(val,'查询')
    if(val.length){
      res.send({s:1,msg:'不好意思用户名已经被注册'})
    }else {
      res.send({s:0,msg:'恭喜用户名还没被注册'})
    }
  })
})
router.get('/checkCode',function (req,res,next) {
  if(!req.session.code){
    req.session.code=parseInt(Math.random()*10000000)
  }
  res.send({code:req.session.code})
})  //查询验证码
router.post('/register',function (req,res,next) {
  let o=req.body
  console.log(o)
  console.log(req.session.code)
  mysql_methods.MySql_where('username',o.name).then(function (val) {
    if(val.length){
        res.send({s:0,
          msg:'已拥有这个用户名'})
    }else {
      if(o.verifyCode!=req.session.code){
        res.send({
          s:0,
          msg:'验证码有错误'
        })
      }
      if(o.verifyCode==req.session.code&&o.password==o.second_password){
        mysql_methods.MySql__add('kankan',o)  //存入数据库
        res.send({
          s:1,
          msg:'注册成功'
        })
        send_email(o.name,'嘿嘿.vovking.cc账号注册成功','欢迎','<b>以后你的账号是:username='+o.name+',password='+o.password+'</b>')
        console.log('新增一位注册用户')
      }else {
          res.send({
            s:0,
            msg:'密码有错误'
          })
      }
    }
  })
})
router.post('/login',function (req,res,next) {
  let o= req.body
 mysql_methods.MySql_where('username',o.username).then(function (val) {
   console.log(val)
 if(val.length){
   if(val[0].password==o.password){
     res.send({
       s:1,
       msg:'登录成功',
       token:val[0].token
     })
   }else{
     res.send({
       s:2,
       msg:'密码错误',
     })
   }
 }else {
   res.send({
     s:0,
     msg:'未注册用户名'
   })
 }
 })

})
router.get('/token',function (req,res,next) {
  let token=req.query.token
  mysql_methods.MySql_where('token',token).then(val=>{
    console.log(token,val)
    if(val.length){
     req.session.login_in=true
      res.send({s:1,msg:'登录成功',t:val[0]})
      console.log('已登录')
    }else {
      req.session.login_in=false
      res.send({s:0,msg:'未登录',t:null})
    }
  })
})  //验证登录状态
router.get('/getdescribe',function (req,res) {
  let id =req.query.id
  kankan_methods.get_describe(id).then(val=>{
    res.send(val)
  })

})
router.get('/getcomment',function (req,res) {
  let id =req.query.id
   kankan_methods.get_comments(id).then(val=>{
     res.send(val)
   })
})
module.exports = router;
