const nodemailer = require('nodemailer');
const config={
  user:'562514042@qq.com',
  emailPwd:'ldtrrmqddrtgbdfi'
}
const params = {
  host: 'smtp.qq.com', // 设置服务
  port: 465, // 端口
  sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
  auth: {
    user: config.user, // 邮箱和密码
    pass: config.emailPwd
  }
}
module.exports=function (toEmail,title,text,html) {
  let mailOptions = {
    from: '"vovking.cc注册邮件 👻" <562514042@qq.com>', // sender address
    to: toEmail, // list of receivers
    subject: title, // Subject line
    text: text, // plain text body
    html: html // html body
  };
  const transporter = nodemailer.createTransport(params)
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(toEmail+'发送邮件成功Message %s sent: %s', info.messageId, info.response);
    // success
    // ...
  })
}
