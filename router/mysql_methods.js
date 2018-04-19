const mysql=require('./mysql')
let crypto = require('crypto');
let methods={
  createdToken (string) {
    return crypto.createHash('sha256')
      .update(string)
      .digest('hex')
  },  //生成token
  MySql_where(key,value) {
    let q='SELECT * from kankan WHERE '+key+'="'+value+'"'
    return new Promise(function (r,j) {
      mysql().then(function (m){
        m.query(q,function (err,s) {
        if(err){
          console.log(err)
        }
        if(s){
          r(s)
        }else {
          r(0)
        }
          m.release()
      })})
    })
  },    // 查找数据库
  MySql__add(sheetName,ud) {
    let token=methods.createdToken(ud.name)
    mysql().then(function (m) {
      let  addSql = 'INSERT INTO '+sheetName+'(Id,username,password,sex,token) VALUES(0,?,?,?,?)';
      let  addSqlParams = [ud.name,ud.password,ud.sex,token];
      m.query(addSql,addSqlParams,function (err, result) {
        m.release()
        if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }
        console.log('--------------------------INSERT----------'+JSON.stringify(ud)+'------成功------------');
      });
    })
  }  // logindata
}
module.exports=methods
