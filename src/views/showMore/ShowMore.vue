<!--底部菜单-->
<template>
  <div id="showMore">
    <!--<ToShowMore/>-->
    <!--为了给SearchResul复用-->
    <div :class="{isChange:isChange}">
      <!--头部-->
      <div class="head" id="head">
        <div :class="{headActive: sortIndex == 0}" @click="selectDefault">综合</div>
        <div :class="{headActive: sortIndex == 1}" @click="selectPrice">
          价格
          <div class="sort-div" v-show="sortIndex == 1">
            <!--升序-->
            <div class="sort-add" :class="{priceSOrtActive: isSortAdd}"></div>
            <!--降序-->
            <div class="sort-cut" :class="{priceSOrtActive: !isSortAdd}"></div>
          </div>
        </div>
        <div :class="{headActive: sortIndex == 3}" @click="selectSellCount">销量</div>
      </div>
      <Show2goods :goods="goods" class="goods"></Show2goods>
    </div>
  </div>
</template>

<script>
  // import ToShowMore from '@/components/head/toShowMore'
  import Show2goods from '@/components/Show2goods'
  import { LoadingPlugin  } from 'vux'
  import  { ToastPlugin} from 'vux'
  import Vue from 'vue'


  Vue.use(LoadingPlugin)
  Vue.use(ToastPlugin)

  export default {
    name: 'showMore',
    components: {
      // ToShowMore,
      Show2goods
    },
    props: {
      isChange: false,//是否改变样式，把整个页面向下移
      pGoods:null//是否有参数
    },
    data: function () {
      return {
        goods: [], //商品
        sortIndex:0,//0：综合，1：价格，2：销量
        isSortAdd:false,//价格升序
        org_goods:[],//记录初始化商品排序，用于综合排序
      }
    },
    computed: {
      class () {
        return this.$store.state.class;　　//需要监听的数据
      }
    },
    created(){
      if(this.isChange){
        console.log("开始搜索");
        this.$vux.loading.show({
          text: '搜索中'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 5000)
      }
    },
    mounted:function () {
      this.$nextTick(function () {


      })

      // this.org_goods = this.goods;

    },
    watch: {
      class: function(val) {
        if(val){
          if(val.className){
            document.title = val.className
          }
          this.goods = this.$store.state.class.goods
          this.org_goods = [];
          let that = this;
          this.goods.forEach(function (item) {
            // console.log("item",item);
            that.org_goods.push(item);
          })

        }
      },
      pGoods:function (val) {
        if(val){
          console.log("this.pGoods != null")
          //如果属性不为null就赋值
          this.goods = val
          if(this.$store.state.class.className){
            document.title = this.$store.state.class.className
          }
        }
        this.org_goods = [];
        let that = this;
        this.goods.forEach(function (item) {
          // console.log("item",item);
          that.org_goods.push(item);
        })
        this.$vux.loading.hide()
        if(this.org_goods.length<=0){
          this.$vux.toast.show({
            type: 'text',
            width:'10em',
            text: '没有搜索到商品'
          })
        }
      }
    },
    methods:{
      selectDefault:function(){
        // console.log("综合",this.org_goods,this.goods)
        this.sortIndex = 0;
        // this.goods = this.org_goods;
        let that = this;
        this.goods = [];
        this.org_goods.forEach(function (item) {
          that.goods.push(item);
        });
      },
      selectPrice:function () {
        if(this.sortIndex == 1){
          if(this.isSortAdd){
            this.isSortAdd = false;
          }else {
            this.isSortAdd = true;
          }
        }
        this.sortIndex = 1;
        if(this.isSortAdd){
          //升序
          this.goods = this.goods.sort((a,b)=>{
            return a.price - b.price;
          })
        }else {
          //降序
          this.goods = this.goods.sort((a,b)=>{
            return b.price - a.price;
          })
        }



      },
      selectSellCount:function () {
        this.sortIndex = 3;
        this.goods = this.goods.sort((a,b)=>{
          return b.buyCount - a.buyCount;
        })
      }
    }

  }

</script>

<style lang="scss" scoped>
  #showMore{
    background-color: white;

    .head{
      display: flex;
      height: 36px;
      width: 375px;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      font-size: 15px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: white;
    }

    .head>div{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 100%;
    }

    .sort-div{
      width: 10px;
    }

    .sort-add{
      border-style: dashed dashed solid dashed;
      border-width: 8px 8px 8px 8px;
      border-color:transparent transparent #6c6c6c transparent ;
      width: 0;
      height: 0;
    }

    .sort-cut{
      /*border-style: solid dashed dashed dashed;*/
      /*border-width: 8px 8px 8px 8px;*/
      /*border-color:#6c6c6c transparent transparent transparent ;*/
      /*width: 0;*/
      /*height: 0;*/

      border-style: dashed dashed solid dashed;
      border-width: 8px 8px 8px 8px;
      border-color:transparent transparent #6c6c6c transparent ;
      width: 0;
      height: 0;
      transform:rotate(180deg);
    }


    .headActive{
      color: #3d7a99;
    }

    .priceSOrtActive{
      border-color:transparent transparent #000 transparent ;
    }





    .isChange{

      .goods{
        margin-top: 36px;
      }
      .head{
        top:36px;
      }

    }


  }


</style>


