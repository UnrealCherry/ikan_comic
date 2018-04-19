
const mysql=require('./router/mysql')()
module.exports={
   MySql_where(key,value) {
  let q='SELECT * from kankan WHERE '+key+'="'+value+'"'
  let p=new Promise(function (r,j) {
    mysql.then(function (m){m.query(q,function (err,s) {
      r(s)
    })})
  })
},    //查找数据库
  checkRepeatName () {
  }



}
