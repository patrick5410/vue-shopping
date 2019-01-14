<template>
  <div class="index">
    <!--搜索框-->
    <Header/>

    <!--内容框-->
    <div class="container" :style="{height:containerHeight+'px'}">
      <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
        <ul>
          <li v-for="(item,index) in goods"  :class="{active : item.clzId == currentClzId}" @click="selectClz(item.clzId)" class="menu_left_li" :id="'clz'+item.clzId">
            <div class="menu_clz">分类{{index}}</div>
          </li>

        </ul>
      </section>

      <section class="menu_right" id="wrapper_good" ref="wrapperGood" :style="{height:containerHeight+'px'}">
        <ul>
          <li v-for="(item,index) in goods" class="clz-sign" :id="'clz-sign'+item.clzId">
            <div class="clz-container">
              <!--<div>{{index}}</div>-->
              <!--商品类型主题图片-->
              <div class="clzImg-div">
                <img src="/img/banner.png" style="width: 100%;height: 100%"  ref='itemImg' />
              </div>

              <!--商品类型主题-->
              <div class="sigma-content">
                <div class="sigma-middle-line">
                  <span class="sigma-line-text">爆款人气推荐{{index}}</span>
                </div>
              </div>
              <!--商品-->
              <div class="good-container">
                <div v-for="it in item.goods"  class="good">
                  <div class="goodImg-div">
                    <img v-lazy="it.img" style="width: 100%;height: auto"  />
                    <div v-show="it.originalPrice>it.price" :style="it.originalPrice-it.price>100?(it.originalPrice-it.price>300?'background-color:#995454':'background-color:#ffbf80'):''" class="cutPrice">直降{{it.originalPrice-it.price}}元</div>
                  </div>
                  <div class="good-bottom">
                    <div>{{it.name}}</div>
                    <div style="color:#995454">¥{{it.price}}</div>
                  </div>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </section>
    </div>
    <!--底部菜单-->
    <Menu/>
  </div>
</template>

<script>

  import Menu from '@/components/Menu'
  import Header from '@/components/head/Header'
  import BScroll from 'better-scroll'

  import VueLazyLoad from 'vue-lazyload'

  import Vue from 'vue'


  // Vue.use(InfiniteScroll)
  // Vue.component(Spinner.name, Spinner);
  Vue.use(VueLazyLoad,{
    error:'/img/good/加载失败.png',
    loading:'/img/good/加载.png',
    adapter: {
      loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init}) {
        // do something here
        // example for call LoadedHandler
        // console.log("图片加载完毕",el,naturalHeight,naturalWidth,src,$parent,Init);
        // if(naturalHeight>naturalWidth){
        //   console.log("高度比宽度大",el);
        // }

      }
    }
  })


  export default {
    name: 'index',
    components: {
      Menu,
      Header
    },
    data(){
      return {
        containerHeight:1200,//内容宽度
        currentClzId:0,//分类id
        clzs:new Array(50),//分类
        wrapperMenuScroll : null,//左边菜单滚动框
        goodScroll: null,//商品滚动框
        goods:[],//商品
        num:0,//商品累计数，待删
        clzSigns:[],//记录各个类型商品的offsetTop值，用于滚动(右边)
        menuIndexChange: false,//menuIndexChange解决运动时listenScroll依然监听的bug
      }
    },
    mounted: function () {

      //自适应高度
      console.log("屏幕高度",window.innerHeight);
      this.containerHeight =  window.innerHeight - window.document.getElementById('header').clientHeight -window.document.getElementById('menu').clientHeight ;
      console.log("containerHeight",this.containerHeight)

      this.$nextTick(function () {
        //商品类型滚动框
        this.wrapperMenuScroll = new BScroll(this.$refs.wrapperMenu, {
          probeType: 0,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 1000,
          click: true,
        })

        this.wrapperMenuScroll.on('scroll', (pos) => {
          console.log("pos",pos,this.wrapperMenuScroll.maxScrollY);

        })

        //商品滚动框
        this.goodScroll = new BScroll(this.$refs.wrapperGood, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 1000,
          click: true,
          bindToWrapper:false
        })

        this.goodScroll.on('scroll', (pos) => {
          // console.log("pos",pos,this.goodScroll.maxScrollY);
          //防止每次都查询所有的元素
          // if(this.clzSigns.length==0){
          //   this.clzSigns = this.$refs.wrapperGood.querySelectorAll(".clz-sign");
          // }


          //不需要遍历
          let maxScrollY = Math.abs(this.goodScroll.maxScrollY);
          let index = Math.floor(Math.abs(pos.y)/maxScrollY*this.goods.length);
          if(index>this.goods.length-1){
            index = this.goods.length-1;
          }
          // console.log("index",index,Math.abs(pos.y),maxScrollY);
          this.currentClzId = this.goods[index].clzId;

          // console.log("clzSigns",this.clzSigns);
          // this.clzSigns.forEach((item,index)=>{
          //   // console.log("item",item);
          //   if(this.menuIndexChange && Math.abs(Math.round(pos.y))>= item.offsetTop - window.document.getElementById("wrapper_good").clientHeight/2 ){
          //     this.currentClzId = this.goods[index].clzId;
          //   }
          // })


        })





        //模拟商品数据
        let that = this;
        for (var i=0;i<8;i++){
          let gs =  [];
          for(var j=0;j<36;j++){
            gs.push({
              id: that.num++,
              name: '车载配件' + i,
              originalPrice:1708,
              price: 1058,
              img: '/img/good/'+(j%9+1)+'.png'
            })
          }
          this.goods.push({
            clzId:i+1,
            goods:gs
          })

        }
        console.log("goos",this.goods);

        //初始化当前选中的商品类型
        this.currentClzId = this.goods[0].clzId;

      });




    },
    methods: {
      loadMore () {
        console.log("滚动到底部");
      },
      selectClz(val){
        // this.currentClzId = val;
        //滚动右边商品框
        let clzSigns = this.$refs.wrapperGood.querySelectorAll('#clz-sign'+val);
        this.goodScroll.scrollToElement(clzSigns[0], 600,0,0)
      }

    },
    watch:{
      currentClzId:function(val) {
        //监听当前类型的变化
        let that = this;
        if(!that.wrapperMenuScroll.isInTransition){
          //滚动左边菜单框
          // console.log("左边滚动");
          let clzs = that.$refs.wrapperMenu.querySelector('#clz'+val);
          that.wrapperMenuScroll.scrollToElement(clzs, 600,0,0)
        }
        // console.log(clzs,that.wrapperMenuScroll);
        // setTimeout(function () {
        //   let clzs = that.$refs.wrapperMenu.querySelector('#clz'+val);
        //   // console.log(clzs,that.wrapperMenuScroll);
        //   that.wrapperMenuScroll.scrollToElement(clzs, 800,0,0)
        // },1000)




      }
    }



  }

</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction:row;
    align-items: flex-start;
    margin-top: 37px;
  }



  .menu_left{
    height: 100%;
    overflow: hidden;
    background-color: #e5e5e5;
    width: 75px;
  }

  .menu_left li{
    height: 40px;
    display: flex;
  }

  .menu_clz{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 100%;
    margin: auto 0;
  }

  .active{
    background-color: white;
    font-size: 14px;
    .menu_clz{
      background-color: white;
      border-left: 4px solid #3d7a99;
    }
  }

  .menu_right{
    width: 280px;
    height: 100%;
    margin: 0 10px;
    overflow: hidden;
  }



  .menu_right li{
    /*border: 1px solid blue;*/
  }

  .clz-container{
    width: 280px;
    padding: 10px 0;
  }

  .clzImg-div{
    width: 100%;
    height: 80px;
  }

  .good-container{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;

  }

  .good{
    margin: 10px 0;
    /*border: 1px solid blue;*/

  }

  .goodImg-div{
    width: 85px;
    height: 85px;
    position: relative;
    background-color: #f2f2f2;
    overflow: hidden;
  }

  .good-bottom{
    display: block;
    width: 100%;
    text-align: left;
  }

  .cutPrice{
    display: flex;
    width: 60px;
    height: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #52992e;
    color: white;
    justify-content: center;
    align-items: center;
    /*border-radius: 2px;*/
  }

  /*文字横线样式*/
  .sigma-content{
    width: 50%;
    margin: 10px auto;
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
    left: 0px;

  }
  .sigma-line-text{
    display: inline-block;
    background: #fff;
    padding: 0 14px 0 14px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #808080;
  }

</style>
