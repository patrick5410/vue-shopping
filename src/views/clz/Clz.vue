<template>
  <div class="index">
    <!--搜索框-->
    <Header/>

    <!--内容框-->
    <div class="container" :style="{height:containerHeight+'px'}">
      <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
        <ul>
          <li v-for="(item,index) in $store.state.classes"  :class="{active : item.classId == currentClzId}" @click="selectClz(item.classId)" class="menu_left_li" :id="'clz'+item.classId">
            <div class="menu_clz">{{item.className}}</div>
          </li>

        </ul>
      </section>

      <section class="menu_right" id="wrapper_good" ref="wrapperGood" :style="{height:containerHeight+'px'}">
        <ul>
          <li v-for="(item,index) in $store.state.classes" class="clz-sign" :id="'clz-sign'+item.classId">
            <div class="clz-container">
              <!--<div>{{index}}</div>-->
              <!--商品类型主题图片-->
              <div class="clzImg-div" @click="toShowClz(item)">
                <img :src="item.themeImg" style="width: 100%;height: 100%"  ref='itemImg' />
              </div>

              <!--商品类型主题-->
              <div class="sigma-content">
                <div class="sigma-middle-line">
                  <span class="sigma-line-text">{{item.theme}}</span>
                </div>
              </div>
              <!--商品-->
              <div class="good-container">
                <div v-for="it in item.goods"  class="good" @click="goodDetail(it.id)">
                  <div class="goodImg-div">
                    <img v-lazy="it.img" style="width: 100%;height: auto"  />
                    <!--<div v-show="it.originalPrice>it.price" :style="it.originalPrice-it.price>100?(it.originalPrice-it.price>300?'background-color:#995454':'background-color:#ffbf80'):''" class="cutPrice">直降{{it.originalPrice-it.price}}元</div>-->
                    <div v-show="it.originalPrice>it.price" style="position: absolute;left: 0;bottom: 0">
                      <span class="cutPrice" :style="it.originalPrice-it.price>100?(it.originalPrice-it.price>300?'background-color:#995454':'background-color:#ffbf80'):'background-color:#52992e'" >&nbsp;直降{{it.originalPrice-it.price}}元&nbsp;</span>
                    </div>

                  </div>
                  <div class="good-bottom">
                    <div>{{it.name}}</div>
                    <div style="color:#995454">¥{{it.price}}</div>
                  </div>
                </div>
              </div>

            </div>
          </li>
          <!--占位li，防止最后一个高度小，左边的滚动菜单滚动不到最后一个分类-->
          <li :style="{height: placeholderHeight}"></li>
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

  // import VueLazyLoad from 'vue-lazyload'
  //
  // import Vue from 'vue'
  //
  //
  // // Vue.use(InfiniteScroll)
  // // Vue.component(Spinner.name, Spinner);
  // Vue.use(VueLazyLoad,{
  //   error:'../../assets/img/good/加载失败.png',
  //   loading:'../../assets/img/good/加载.png',
  //   adapter: {
  //     loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init}) {
  //       // do something here
  //       // example for call LoadedHandler
  //       // console.log("图片加载完毕",el,naturalHeight,naturalWidth,src,$parent,Init);
  //       // if(naturalHeight>naturalWidth){
  //       //   console.log("高度比宽度大",el);
  //       // }
  //
  //     }
  //   }
  // })


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
        clzSigns:[],//记录各个类型商品的offsetTop值，用于滚动(右边)
        menuIndexChange: false,//menuIndexChange解决运动时listenScroll依然监听的bug
        placeholderHeight:'0px',// 占位li高度
      }
    },
    computed: {
      classes () {
        return this.$store.state.classes;　　//需要监听的数据
      }
    },
    created(){
      console.log("请求test",this.$store.state.userInfo)
      console.log("classes",this.$store.state.classes)
      // this.goods = this.$store.state.classes
    },
    mounted: function () {
      this.$nextTick(function () {
        //自适应高度
        // console.log("屏幕高度",window.innerHeight);
        this.containerHeight =  window.innerHeight - window.document.getElementById('header').clientHeight -window.document.getElementById('menu').clientHeight ;
        // console.log("containerHeight",this.containerHeight)

        //商品类型滚动框
        this.wrapperMenuScroll = new BScroll(this.$refs.wrapperMenu, {
          probeType: 0,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 1000,
          click: true,
        })

        this.wrapperMenuScroll.on('scroll', (pos) => {
          // console.log("pos",pos,this.wrapperMenuScroll.maxScrollY);

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
          if(this.clzSigns.length==0){
            //这一步放到mounted时，clzs长度为0，只能放在这里
            let clzs = window.document.getElementsByClassName("clz-sign");
            // console.log("滚动时",clzs.length,clzs.item(0),window.document.getElementById("wrapper_good").clientHeight)
            if(clzs[clzs.length-1].clientHeight<window.document.getElementById("wrapper_good").clientHeight/3*2){
              this.placeholderHeight = window.document.getElementById("wrapper_good").clientHeight/2+"px"
            }

            this.clzSigns = this.$refs.wrapperGood.querySelectorAll(".clz-sign");
            // console.log("最后一个元素高度",this.clzSigns[this.clzSigns.length-1].clientHeight,window.document.getElementById("wrapper_good").clientHeight/3*2)
          }


          //不需要遍历
          // let maxScrollY = Math.abs(this.goodScroll.maxScrollY);
          // let index = Math.floor(Math.abs(pos.y)/maxScrollY*this.goods.length);
          // if(index>this.goods.length-1){
          //   index = this.goods.length-1;
          // }
          // // console.log("index",index,Math.abs(pos.y),maxScrollY);
          // this.currentClzId = this.goods[index].clzId;

          // console.log("clzSigns",this.clzSigns);
          let clzId = -1;
          let that = this
          this.clzSigns.forEach((item,index)=>{
            // console.log("item",item);
            if( Math.abs(Math.round(pos.y))>= item.offsetTop - window.document.getElementById("wrapper_good").clientHeight/3 ){
              // this.currentClzId = this.goods[index].clzId;
              clzId = that.$store.state.classes[index].classId
            }
          })

          // console.log("clzId",clzId)
          if(clzId != -1){
            this.currentClzId = clzId;
          }

        })

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
      },
      //商品详情页面
      goodDetail(goodId){
        this.$router.push({name:'good',query:{goodId:goodId}})
      },
      toShowClz (item) {
        this.$router.push({name:'showMore',query:{classId:item.classId}})
      }

    },
    watch:{
      currentClzId:function(val) {
        if(val && this.wrapperMenuScroll){
          //监听当前类型的变化
          // let that = this;
          //滚动左边菜单框
          // console.log("左边滚动");
          let clzs = this.$refs.wrapperMenu.querySelector('#clz'+val);
          this.wrapperMenuScroll.scrollToElement(clzs, 600,0,0)
        }
        // console.log(clzs,that.wrapperMenuScroll);
        // setTimeout(function () {
        //   let clzs = that.$refs.wrapperMenu.querySelector('#clz'+val);
        //   // console.log(clzs,that.wrapperMenuScroll);
        //   that.wrapperMenuScroll.scrollToElement(clzs, 800,0,0)
        // },1000)


      },
      classes:function (val) {
        console.log("classes发生改变",val);
        if(val.length>0){
          this.currentClzId = val[0].classId
        }
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
    background-color: white;
  }



  .menu_left{
    height: 100%;
    overflow: hidden;
    background-color: #e5e5e5;
    width: 75px;
    li{
      height: 40px;
      display: flex;
    }
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
    /*display: flex;*/
    /*width: 65px;*/
    /*height: 16px;*/
    /*background-color: #52992e;*/
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    border-radius: 1px;
  }

  /*.cutPrice{*/
    /*display: flex;*/
    /*width: 50px;*/
    /*height: 14px;*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*background-color: #52992e;*/
    /*color: white;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*!*line-height: 14px;*!*/
    /*font-size: 10px;*/
    /*border-radius: 1px;*/
  /*}*/

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
