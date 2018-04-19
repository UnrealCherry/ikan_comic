let mysql    = require('mysql');
let connection = mysql.createPool({
  host     : '23.105.194.80',
  user     : 'root',
  password : '123456',
  database : 'test',
  port:'3306',
  useConnectionPooling: true
});

module.exports=function () {
  return new Promise(function (resolve,reject) {
    connection.getConnection(function(err,connection) {
      if (err) {
        reject()
        console.log('连接数据库失败')
        console.error('error connecting: ' + err.stack);
        return false
      }else {
        resolve(connection)
        console.log('连接数据库成功')
        console.log('connected as id ' + connection.threadId);
      }

    });
  })
}
