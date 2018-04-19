<template>
    <div :style="{'height':this.$store.state.viewHeight+'px'}" ref="scroll" style="padding: 10%">
      <el-row >
        <el-col :span="24" >
          <el-card :body-style="{ padding: '10px' }">
            <img src="static/wx.jpg" class="image">
            <div style="padding: 14px;">
              <span>作者微信</span>
              <div class="bottom clearfix">
                <time class="time">欢迎提意见...</time>
            <!--    <el-button type="text" class="button">操作按钮</el-button>-->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        created() {
            this.init()
        },
        components: {},
        data() {
            return {
                scroll: '初始化bs',
              currentDate: new Date()
            }
        },
        methods: {
            init() {
                this.$nextTick(function () {
                    this.scroll = new BScroll(this.$refs.scroll, {
                        click: true
                    })
                })
            }
        }
    }
</script>

<style scope lang='less'>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
