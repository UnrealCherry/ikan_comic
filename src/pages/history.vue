<template>
    <div :style="{'height':this.$store.state.viewHeight+'px'}" ref="scroll" style="background: rgb(238, 238, 238)">
        <book :home_data="home_data" :title="'历史记录'" ></book>
      </div>
</template>

<script>
  import  pubic_fn from 'static/_PubicFunction.js'
  import BScroll from 'better-scroll'
  import  book from '@/pages/book.vue'
    export default {
        created() {
            this.init()
        },
      components:{
        book
      },
        data() {
            return {
                scroll: '初始化bs',
                home_data:[]
            }
        },
        methods: {
          init() {
           this.get_history()
            this.$nextTick(function () {
              this.scroll = new BScroll(this.$refs.scroll, {
              })
            })
            },
          get_history(){
            var s=this.$store.state.history_data
            if(s){
              for(let q of s){
                var obj={
                  name:q.title,
                  id:q.id,
                  cover:'https://cf.hamreus.com/cpic/h/'+q.id+'.jpg',
                  word:q.word
                }
                this.home_data.push(obj)
              }
            }
          }
        }
    }
</script>

<style scope lang='less'>

</style>
