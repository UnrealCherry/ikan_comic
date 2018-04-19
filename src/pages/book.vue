<template>
      <div class=" wrapper">
        <h1 class="title">
          <svg class="icon" aria-hidden="true">
            <use  :xlink:href="'#icon-sheep'"></use>
          </svg>
          <span  class="font">{{title}}</span>
        </h1>
        <div class="animation"  v-for="(l,index) in home_data"  >
          <router-link :to="'details?id='+l.id+'&word='+l.name">
            <div class="book"    :style="{'background-image':'url('+l.cover+')'}">
              <div  class="tags">{{l.name}}</div>
            </div>
          </router-link>
        </div>
      </div>
</template>

<script>
    export default {
      props:['home_data','title','episode'],
        created() {
            this.init()
        },
        data() {
            return {
                scroll: '初始化bs'
            }
        },
        methods: {
            init() {

            }
        }
    }
</script>

<style scope lang='less'>
  .font{
    vertical-align: super;
    color: #ff4a4a;
    border: 1px #ffd077 solid;
  }
  .book{
    display: flex;
    align-items:flex-end;
    .tags{
      width: inherit;height:16px;background: #4a49ff;text-align: center;color: white;font-size: 12px;
    }
    width: 90px;height: 150px;box-sizing: border-box;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.58),5px 5px 2px 2px rgba(0, 0, 0, 0.43),
    4px 4px 10px 3px rgb(255, 255, 255);
    background-size: cover;background-position:center center;
    overflow: hidden;
    border-radius: 5px  0 0  5px  ;
  }
  .title{
    text-align: center;margin: 10px 0;padding:0 20%;font-weight: 800
  }
  .search-hover:hover{
    background: red;
    color: white;
  }
  a{
    cursor:pointer;
    text-decoration:none;
  }
  img{
    object-fit: scale-down;
  }
  .wrapper{
    width: 100%;
    padding: 10px;
    .animation{
      transition: 0.1s ease;
      background: white;
      text-align: center;margin-left: 15px;margin-top: 10px;
      display: inline-block;
    }
    .animation:hover{
      transform: scale(1.1);
      opacity: 0.8;
      box-shadow: 1px 1px 5px #ababab;
    }
  }
</style>
