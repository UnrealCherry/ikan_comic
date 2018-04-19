var express = require('express');
var app = express();
var superagent  =require('superagent')   //一个类似Ajax为了访问网页返回数据的包
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var http=require("http")
var bodyParser = require('body-parser');
let filerREG = /[^\d]/g
let methods= {
  convertPagesNum(i) {
    if (i == 0) {
      return '000/'
    }
    if (i < 10) {
      return '00' + i + '/'
    }
    if (i < 26) {
      return '0' + i + '/'
    }
    if (i < 1000) {
      return i + '/'
    }
  },   //转换页数
  downloadImg(imgSrc, pages) {
    if (imgSrc) {
      http.get(imgSrc, (res, i) => {
        res.pipe(fs.createWriteStream(dir + "/" + pages + ".jpg"))   //用node的流方式保存图片 具体API可以去node官网看
        console.log("爬取" + imgSrc + "进" + dir + "目录成功")
      })
    } else {
      console.log('没图片你让我怎么转')
    }
  }, //下载img
  editRightSrc(text) {
    if (text) {
      let fillerText = 'var mhurl = "'
      let j = text.indexOf(fillerText) + fillerText.length
      let j2 = text.substring(j)
      let pagesImg = j2.substring(0, j2.indexOf('";')) || null
      let urlTrue = 'http://101.110.118.61/p0.xiaoshidi.net/' + pagesImg
      return urlTrue
    } else {
      console.log('转换url失败')
    }
  }, //转换地址
  string(value) {
    return value + ''
  }, //转换字符串
  getLastEpisode(comic_id) {
    let url = "http://manhua.fzdm.com/" + comic_id + "//"
    let lastPages = 0
    return new Promise(function (resolve, reject) {
      superagent.get(url).end(function (error, response) {
        if(response) {
          var arr=[]
          let $ = cheerio.load(response.text)
          $('.pure-u-1-2 a').map(function (i,ele) {
          arr.push({name:$(ele).text(),href:url+$(ele).attr('href')})
          })
          resolve(arr)
        }else {
          reject(404)
        }
      })
    })
  }, //获得漫画的总集数
  getName(comic_id){
    let id=comic_id
    return  new Promise(function (resolve,reject) {
      let url = "http://manhua.fzdm.com/" + id+ "//"
      superagent.get(url).end(function (error,response) {
        let fiiler='<meta property="og:title" content="'
        let fiiler2='<meta property="og:type" content="novel" />'
        let data=response.text.substring(response.text.indexOf(fiiler)+fiiler.length,response.text.indexOf(fiiler2))
        let reg=/\" \/>/
        let reg2=/漫画/
        let data2=data.replace(reg,'').replace(reg2,'')
        resolve(data2)
      })
    })
  },  //获得漫画名字
  convertImg(href,pages){
    let url=href+'/index_'+pages+'.html'
    return new Promise(function (resolve,reject) {
      superagent.get(url).end(function (error,response) {
        if(response){
          let $=cheerio.load(response.text)
          let img=methods.editRightSrc($.html())
          resolve(img)
        }else {
          reject(404)
        }
      })
    })

  },  //id 集数 页数 转换成链接
 getBDImg(word) {
  return new Promise(function (resolve,reject) {
    var url='https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1521185896852_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word='+word
    superagent.get(encodeURI(url)).end(function (err,res) {
      if(!res) {
        reject()
        return
      }
      try {
        var $ = cheerio.load(res.text)
        var s=$.html().split('app.setData(')[2].split('\'imgData\', ')[1]
        var q=s.substring(0,s.length-7).replace(/\,\{\}\]\}/g,'')
        var w= q.split('{"thumbURL":')
        var arr=[]
        for (var i=1;i<w.length;i++){
          arr.push(w[i].split(',"replaceUrl"')[0].replace(/"/g,''))
        }
        resolve(arr[parseInt(Math.random()*(arr.length-1))])
      }
        catch (e){
        console.log(e)
        }


    })

  })
} ,// 输入keyword爬取百度图片
}
module.exports=methods
