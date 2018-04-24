# ikan_comic(http://www.vovking.cc/comic/index.html)
# 前言
 之前爬风之动漫漫画太少就放弃了
 后爬的漫画柜提供的网页
 花了整整三天研究漫画柜页面的逻辑..
 终于艰苦的爬下来了
 ## 技术栈
 * 前端框架:vue+vuex+axios+vue-pull-to+vue-router-elemen.ui 
 * 后端 : express+pm2
 * 数据库:mysql(dataBase:kankan)
 * 手机端调试:eruda
 
 ### 更新日期
 * `4.10` 更新搜索功能
 * `4.12` 更新登录注册功能
 * `4.15` 更新了上下翻集(sarifa用不了因为vue-router有bug 好像不兼容this.$router.go(1)后用window.location.reload()代替)
 * `4.18`
      * 增加目录 简介 评价
      *  更新了界面UI    
      * 增加了 注册成功后 发送一封提示邮件
 * `4.22`
      - 漫画主体增加页数,时间提示
      - 修复有些页面太高而超出容器bug
  * `4.24`
      - 修复轮播加载不滚动
 ###  目录结构 
 #### 服务器
> crawler.js 服务器启动入口文件
>> router
>>> * email.js 邮件 
>>> * index.js 路由
>>> * kankan_pubic.js 漫画爬虫封装的函数
>>> * mysql.js mysql入口启动
>>> * mysql_methods.js mysql封装函数
>>> * pubic.js 风之动漫爬虫封装函数(暂时不使用,后期两网站合并)
 #### 前端
> src
>> * login  登录页面
>> * author 作者页面
>> * pages 组件
>>> * book.vue book组件
>>> * history.vue history页面
>>> * home.vue 首页
>>> * main-part.vue 目录页面
>>> * main-body.vue 漫画页面
>>> * open_option.vue 选项组件

 ### 预览图
 ![](https://github.com/pulessrity/ikan_comic/blob/master/gitview/1.png?raw=true '描述')
 ![](https://github.com/pulessrity/ikan_comic/blob/master/gitview/2.png?raw=true '描述')
 ![](https://github.com/pulessrity/ikan_comic/blob/master/gitview/3.png?raw=true '描述')
 ![](https://github.com/pulessrity/ikan_comic/blob/master/gitview/4.png?raw=true '描述')
 ![](https://github.com/pulessrity/ikan_comic/blob/master/gitview/5.png?raw=true '描述')
   
   



