let express = require('express');
let app = express();
let superagent  =require('superagent')   //一个类似Ajax为了访问网页返回数据的包
let cheerio = require('cheerio');
let path = require('path');
let fs = require('fs');
let http=require("http")
let bodyParser = require('body-parser');
let methods={
  search(key){
    let url='http://www.manhuagui.com/tools/word.ashx?key='+key
    return new Promise(function (resolve,reject) {
      superagent.get(url).end(function (err,res) {
        if(res){
          resolve(res.text)
        }
      })
    })
  },
  getEpisode(id){
 let url='http://www.manhuagui.com/comic/'+id
    return new Promise(function (resolve,reject) {
      superagent.get(url).end(function (err,res) {
        if(res){
        let $=cheerio.load(res.text)
          let title=[]
          let last=[]
      $('h4').map(function (i,ele) {
      title.push($(ele).text())
          })
          $('.chapter-list').map(function (i,ele) {
            let arr=[]
              $(ele).find('.status0').map(function (i,ele1) {
                arr.push({
                  name:$(ele1).attr('title'),
                  p:  $(ele1).html().substring( $(ele1).html().indexOf('<i>')+3,$(ele1).html().indexOf('</i>')),
                  href:$(ele1).attr('href'),
                  id:id
                })
              })
            last.push({title:title[i],data:arr})
          })
          resolve(last)
        }
      })

    })
  },
  getPage(id,episode,page){
    return  new Promise(function (resolve,reject) {
      let url='http://www.manhuagui.com/comic/'+id+'/'+episode+'.html#p='+page
      superagent.get(url).end(function (err,res) {
        if(res) {
          let $ = cheerio.load(res.text),
            f = $.html(),
            q = f.substring(f.indexOf('function(p,a,c,k,e,d)')),
            t = q.substring(0, q.indexOf('</script>') - 2),
            g = '',
            r = t.replace('return p', 'g=p'),
            d = '(' + r + ')'
          let LZString = (function () {
              let f = String.fromCharCode;
              let keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
              let baseReverseDic = {};

              function getBaseValue(alphabet, character) {
                if (!baseReverseDic[alphabet]) {
                  baseReverseDic[alphabet] = {};
                  for (let i = 0; i < alphabet.length; i++) {
                    baseReverseDic[alphabet][alphabet.charAt(i)] = i
                  }
                }
                return baseReverseDic[alphabet][character]
              }

              let LZString = {
                decompressFromBase64: function (input) {
                  if (input == null)
                    return "";
                  if (input == "")
                    return null;
                  return LZString._0(input.length, 32, function (index) {
                    return getBaseValue(keyStrBase64, input.charAt(index))
                  })
                },
                _0: function (length, resetValue, getNextValue) {
                  let dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w,
                    bits, resb, maxpower, power, c, data = {
                      val: getNextValue(0),
                      position: resetValue,
                      index: 1
                    };
                  for (i = 0; i < 3; i += 1) {
                    dictionary[i] = i
                  }
                  bits = 0;
                  maxpower = Math.pow(2, 2);
                  power = 1;
                  while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++)
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1
                  }
                  switch (next = bits) {
                    case 0:
                      bits = 0;
                      maxpower = Math.pow(2, 8);
                      power = 1;
                      while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++)
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1
                      }
                      c = f(bits);
                      break;
                    case 1:
                      bits = 0;
                      maxpower = Math.pow(2, 16);
                      power = 1;
                      while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++)
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1
                      }
                      c = f(bits);
                      break;
                    case 2:
                      return ""
                  }
                  dictionary[3] = c;
                  w = c;
                  result.push(c);
                  while (true) {
                    if (data.index > length) {
                      return ""
                    }
                    bits = 0;
                    maxpower = Math.pow(2, numBits);
                    power = 1;
                    while (power != maxpower) {
                      resb = data.val & data.position;
                      data.position >>= 1;
                      if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++)
                      }
                      bits |= (resb > 0 ? 1 : 0) * power;
                      power <<= 1
                    }
                    switch (c = bits) {
                      case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while (power != maxpower) {
                          resb = data.val & data.position;
                          data.position >>= 1;
                          if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++)
                          }
                          bits |= (resb > 0 ? 1 : 0) * power;
                          power <<= 1
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                      case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while (power != maxpower) {
                          resb = data.val & data.position;
                          data.position >>= 1;
                          if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++)
                          }
                          bits |= (resb > 0 ? 1 : 0) * power;
                          power <<= 1
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                      case 2:
                        return result.join('')
                    }
                    if (enlargeIn == 0) {
                      enlargeIn = Math.pow(2, numBits);
                      numBits++
                    }
                    if (dictionary[c]) {
                      entry = dictionary[c]
                    } else {
                      if (c === dictSize) {
                        entry = w + w.charAt(0)
                      } else {
                        return null
                      }
                    }
                    result.push(entry);
                    dictionary[dictSize++] = w + entry.charAt(0);
                    enlargeIn--;
                    w = entry;
                    if (enlargeIn == 0) {
                      enlargeIn = Math.pow(2, numBits);
                      numBits++
                    }
                  }
                }
              };
              return LZString
            })();
          String.prototype.splic = function (f) {
            return LZString.decompressFromBase64(this).split(f)
          }
          ;
          eval(d)
           let c=g.replace('SMH.imgData(','').replace(').preInit();','')
          resolve(c)
        }else {
          reject(404)
        }
      })
    })

  },
  sendImg(url){
    return new  Promise(function (resolve,reject) {
      superagent.get(encodeURI(url)).set('Referer','http://www.manhuagui.com/').set('Accept','image/webp,image/*,*/*;q=0.8').end(function (err,res) {
        if(res) {
        let data=JSON.stringify(res.body.toString('base64'))
          resolve(data)
        }
      })
    })
  },
  getcover(id){
    let url='http://www.manhuagui.com/comic/'+id
    return new Promise(function (resolve,reject) {
      superagent.get(url).end(function (err,res) {
        if(res.text){
          let $=cheerio.load(res.text),
          cover=$('.hcover img').attr('href')
          resolve(cover)
        }
      })
    })

  },
  getBDImg(word) {
    return new Promise(function (resolve,reject) {
      let url='https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1521185896852_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word='+word+
        '&width=1920&height=1080'
      superagent.get(encodeURI(url)).end(function (err,res) {
        if(!res) {
          reject()
          return
        }
        try {
          let $ = cheerio.load(res.text)
          let s=$.html().split('app.setData(')[2].split('\'imgData\', ')[1]
          let q=s.substring(0,s.length-7).replace(/\,\{\}\]\}/g,'')
          let w= q.split('{"thumbURL":')
          let arr=[]
          for (let i=1;i<w.length;i++){
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
  get_describe(id){
    let url ='http://www.manhuagui.com/comic/'+id
    return new Promise(function (r,s) {
      superagent.get(url).end((err,res)=>{
        if(res) {
          let $ = cheerio.load(res.text)
          r($('#intro-all p').text())
        }
        })
    })
  },
  get_comments(id){
    let url ='http://www.manhuagui.com/tools/submit_ajax.ashx?action=comment_list&book_id='+id+'&page_index=1'
    return new Promise(function (r,s) {
      superagent.get(url).end((err,res)=>{
        if(res) {
        console.log(r(JSON.parse(res.text)))
        }
      })
    })
  }
}
module.exports=methods
