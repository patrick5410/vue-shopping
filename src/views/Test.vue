<template>
  <div>
    <!--<group>-->
      <!--<cell is-link title="pullup" link="/component/pullup">Pullup</cell>-->
      <!--<cell is-link title="pulldown" link="/component/pulldown">Pulldown</cell>-->
      <!--<cell is-link title="pulldownpullup" link="/component/pulldown-pullup">PulldownPullup</cell>-->
    <!--</group>-->

    <!--<divider>不带滚动条的水平</divider>-->
    <!--<scroller lock-y :scrollbar-x=false>-->
      <!--<div class="box1">-->
        <!--<div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>-->
      <!--</div>-->
    <!--</scroller>-->

    <!--<divider>显示滚动条的水平</divider>-->
    <!--<scroller lock-y scrollbar-x>-->
      <!--<div class="box1">-->
        <!--<div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>-->
      <!--</div>-->
    <!--</scroller>-->

    <!--<divider>没有边缘回滚效果的水平</divider>-->
    <!--<scroller lock-y scrollbar-x :bounce=false>-->
      <!--<div class="box1">-->
        <!--<div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>-->
      <!--</div>-->
    <!--</scroller>-->

    <divider>竖向 scroller scrollTop: {{scrollTop}}</divider>
    <scroller lock-x :scroll-bottom-offset="5"  height="10rem" @on-scroll-bottom="loadMore" class="scroller-container">
      <div class="goods-container">
        <div class="goods" >
          <div class="good" v-for="(item,index) in goods" :key="item.id" @click="goodDetail(item.id)">
            <div class="good-img">
              <!--<img :src="item.img" lowsrc="/img/good/加载失败.png" style="width: 100%;height: 100%">-->
              <img v-lazy="item.img" style="width: 100%;height: auto"  ref='itemImg' />
              <div v-show="item.originalPrice>item.price" style="position: absolute;left: 0;bottom: 0">
                <span class="cutPrice" :style="item.originalPrice-item.price>100?(item.originalPrice-item.price>300?'background-color:#995454':'background-color:#ffbf80'):'background-color:#52992e'" >&nbsp;直降{{item.originalPrice-item.price}}元&nbsp;</span>
              </div>
            </div>
            <div class="good-bottom">
              <div>{{item.name}}</div>
              <div style="color:#995454">¥{{item.price}}</div>
            </div>
          </div>
          <div class="loading" v-show="loading">
            <!--<mt-spinner :size="60"></mt-spinner>-->
            <img  class="loading-img" src="/img/loading.gif"/>
            加载中...
          </div>
          <div v-show="isFinish" class="bottom-line">
            <divider >我是有底线滴</divider>
          </div>
        </div>
      </div>
    </scroller>


    <!--底部菜单-->
    <Menu/>
    <!--<x-button type="primary" @click.native="$refs.scrollerEvent.reset({top:0})">reset</x-button>-->

    <!--<divider>竖向 scroller</divider>-->
    <!--<scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">-->
      <!--<div class="box2">-->
        <!--<p v-for="i in bottomCount">placeholder {{i}}</p>-->
        <!--<load-more tip="loading"></load-more>-->
      <!--</div>-->
    <!--</scroller>-->

    <!--<divider>竖向 scroller</divider>-->
    <!--<scroller lock-x scrollbar-y height="200px" ref="scroller">-->
      <!--<div class="box2">-->
        <!--<p v-for="i in 20" v-if="showList1">placeholder {{ i + '' + i }}</p>-->
        <!--<p v-for="i in 10" v-if="!showList1">placeholder {{ i }}</p>-->
        <!--<x-button style="margin:10px 0;" type="primary" @click.native="onClickButton">竖向 scroller</x-button>-->
        <!--<group>-->
          <!--<cell @click.native="onCellClick" title="Title" value="Value"></cell>-->
        <!--</group>-->
      <!--</div>-->
    <!--</scroller>-->
    <!--<x-button @click.native="changeList" type="primary">竖向 scroller</x-button>-->
  </div>
</template>

<i18n>
  A Horizontal Scroller without Scrollbar:
  zh-CN: 不带滚动条的水平 scroller
  A Horizontal Scroller with Scrollbar:
  zh-CN: 显示滚动条的水平 scroller
  A Horizontal Scroller without bounce effect:
  zh-CN: 没有边缘回滚效果的水平 scroller
  A Vertical Scroller:
  zh-CN: 竖向 scroller
  A Vertical Scroller with scrollbar:
  zh-CN: 显示滚动条的竖向 scroller
  show another list:
  zh-CN: 改变显示的内容
  Button:
  zh-CN: 按钮
  event:on-scroll-bottom:
  zh-CN: 检查是否滚动到底部
</i18n>

<script>
  import {Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore} from 'vux'
  import Menu from '@/components/Menu'
  import Header from '@/components/head/Header'
  import Credit from '@/components/Credit'


  export default {
    components: {
      Scroller,
      Divider,
      Spinner,
      XButton,
      Group,
      Cell,
      LoadMore,
      Menu,
      Header,
      Credit,
    },
    data() {
      return {
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        creditSort: 425, // 用户积分
        recommendClass: '车载配件', // 推荐商品类型
        recommendClassUrl: '/showMore', // 推荐商品链接
        recommendImgUrl: '/img/banner.png', // 推荐商品图片
        loading: false, // 加载
        isFinish:false,
        goods: [],
        num: 4
      }
    },
    mounted() {
      this.$nextTick(() => {
        // this.$refs.scrollerEvent.reset({top: 0})
      })
      this.$nextTick(() => {
        // this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    methods: {
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.bottomCount += 10
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      onScroll(pos) {
        this.scrollTop = pos.top
      },
      onCellClick() {
        window.alert('cell click')
      },
      onClickButton() {
        window.alert('click')
      },
      changeList() {
        this.showList1 = false
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
      },
      toRecommendClass() {
        this.$router.push({path: this.recommendClassUrl, query: {clzName: this.recommendClass}})
      },
      //加载更多
      loadMore() {
        let that = this;
        if (!that.isFinish && !this.loading ) {
          this.loading = true
          setTimeout(() => {
            let last = this.goods[this.goods.length - 1]
            for (let i = 1; i <= 9; i++) {
              if (i % 3 == 0) {
                this.goods.push({
                  id: that.num++,
                  name: '车载配件' + i,
                  originalPrice: 1108,
                  price: 1058,
                  img: '/img/good/' + i + '.jpg'
                })
              } else if (i % 3 == 1) {
                this.goods.push({
                  id: that.num++,
                  name: '车载配件' + i,
                  originalPrice: 1304,
                  price: 1058,
                  img: '/img/good/' + i + '.jpg'
                })
              } else {
                this.goods.push({
                  id: that.num++,
                  name: '车载配件' + i,
                  originalPrice: 1406,
                  price: 1058,
                  img: '/img/good/' + i + '.jpg'
                })
              }


            }
            this.loading = false

            if (this.num > 50) {
              that.isFinish = true;
            }

          }, 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }

  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }

  .box1-item:first-child {
    margin-left: 0;
  }

  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
  .container{
    width: 375px;
    height: 230px;
    background-color: white;
    margin-top: 36px;
    margin-bottom: 65px;
  }


  /*推荐商品*/
  .recommend-good{
    display: flex;
    width: 100%;
    height: 120px;
    background-color: white;
    position: relative;
  }

  .re-class{
    display: flex;
    width: 355px;
    margin: 5px 10px;
    height: 20px;
    position: relative;
    /*justify-content: center;*/
    align-items:center;
  }

  .re-className{
    display: inline-flex;
    font-size: 16px;
  }

  .re-more{
    display: inline-flex;
    position: absolute;
    /*justify-content: center;*/
    align-items: baseline;
    width: 50px;
    right: 0;
    color: #808080;
    background-image: url("/img/箭头.png");
    background-size: 17px 17px;
    background-position: right;
    background-repeat: no-repeat;
    font-size: 14px;
  }

  .re-classImg{
    width: 355px;
    height: 80px;
    position: absolute;
    top: 30px;
    left: 10px;
  }

  .scroller-container{
    /*height :10px;*/
    height: 600px;
    border: 1px solid yellow;
  }

  /*商品列表*/
  .goods-container{
    display: flex;
    width: 375px;
    background-color: white;
    /*padding-bottom: 60px;*/

    border: 1px solid blue;
  }

  .goods{
    display: flex;
    width: 355px;
    margin: 0 auto;
    flex-wrap:wrap;
    justify-content:space-between;
  }

  .good{
    width: 110px;
    height: 150px;
    margin: 5px 0;
    /*text-align: left;*/
    /*background-color: blue;*/
    /*border: 1px solid blue;*/
  }

  .good-img{
    width: 110px;
    height: 110px;
    overflow: hidden;
    position: relative;
    /*background-color: #f2f2f2;*/
    background: rgba(0,0,0,0.02);
  }
  .good-bottom{
    display: block;
    width: 100%;
    text-align: left;
  }
  .good-bottom>div{
    width: 110px;
  }

  .cutPrice{
    /*display: flex;*/
    /*width: 50px;*/
    /*height: 12px;*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*background-color: #52992e;*/
    /*color: white;*/
    /*justify-content: center;*/
    /*align-items: baseline;*/
    /*font-size: 10px;*/
    /*border-radius: 1px;*/

    color: white;
    /*justify-content: center;*/
    /*align-items: center;*/
    font-size: 12px;
    border-radius: 1px;
  }

  .loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 15px;
    margin: 10px auto;
  }

  .loading-img{
    height: 22px;
    width: 22px;
    margin-right: 10px;
  }

  .bottom-line{
    width: 100%;
    margin: 10px;
  }

  /*底部横线样式*/
  .sigma-content{
    width: 100%;
    margin: 10px;
    text-align: center;
    background-color: #fff;

  }
  .sigma-middle-line:before{
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    /*width: 375px;*/
    background-color: #999;/*颜色需与主题大背景色一致*/
    position: relative;
    top: 10px;/*调节线高*/
    left: 0;
  }
  .sigma-line-text{
    display: inline-block;
    background: #fff;
    padding: 0 18px 0 18px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #808080;
  }

</style>
