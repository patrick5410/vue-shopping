<!--搜索页面-->
<template>
  <div class="search-container">
    <Header ref="header"></Header>
    <div class="history-search" style="height: 50vh">
      <div class="history-search-head">
        <div>最近搜索</div>
        <div style="color: #0b89dc" @click="clearHistorySearch">清除</div>
      </div>

      <div class="history-search-content">
        <div v-for="item in historySearch" @click="clickKeyWord(item)">{{item}}</div>
      </div>

    </div>
  </div>
</template>


<script>
  import Header from '@/components/head/Header'
  import RemainSpace from '@/components/RemainSpace'

  // $vm.use(ToastPlugin)
  export default {
    components: {
      Header,
      RemainSpace,
    },
    data(){
      return{
        historySearch:[],//搜索历史
        containerHeight:window.innerHeight
      }
    },
    created(){

      // this.oldSetItem = window.localStorage.setItem

      // window.localStorage.setItem = function (k,v) {
      //   console.log("k-v",k,v)
      //   // window.localStorage.setItem(k,v)
      // }

      // localStorage.setItem("test",'测试是否存在')
      // console.log("test",localStorage.getItem("test"))
      // alert(localStorage.getItem("test"))


    },
    computed:{

    },
    watch:{
      // gethHistorySearch:function (val) {
      //   console.log("值改变");
      //   console.log("val",val)
      // }
    },
    mounted () {
      this.$nextTick(() => {
        if(this.$route.path.indexOf('search') !== -1){
          this.$refs.header.$refs['searchInput'].focus()
        }

        try{
          this.historySearch = []
          if(localStorage.getItem('historySearch')){
            this.historySearch = JSON.parse(localStorage.getItem('historySearch'))
          }
        }catch (e) {
          console.log("出现异常",e)
          localStorage.removeItem('historySearch')
        }


        let search = this.$refs.header.search
        let that = this
        // console.log("header",this.$refs.header)
        this.$refs.header.search = function () {
          // console.log("监听搜索记录事件")
          search()
          //这里不会出现异常
          that.historySearch = JSON.parse(localStorage.getItem('historySearch'))
        }


        //重写不了window.localStorage.setItem，header调用时报异常
        // let oldSetItem = window.localStorage.setItem
        // let that = this
        // window.localStorage.setItem = function (k,v) {
        //   console.log("监听setItem",k,v)
        // // 只监听historySearch
        // if( k === 'historySearch'){
        //   try{
        //     that.historySearch = JSON.parse(localStorage.getItem('historySearch'))
        //     if(!that.historySearch){
        //       that.historySearch = []
        //     }
        //     console.log("historySearch之前",that.historySearch)
        //     that.historySearch.unshift(v)
        //     console.log("historySearch添加后",that.historySearch)
        //     v = JSON.stringify(that.historySearch)
        //   }catch (e) {
        //     console.log("出现异常",e)
        //     //出现异常就清除缓存数据
        //     localStorage.removeItem('historySearch')
        //   }
        // }
        //
        //   // 这一步是为了重写window.localStorage.setItem后不影响其他setItem
        //   oldSetItem(k,v)
        // }

      })
    },
    methods:{
      clearHistorySearch(){
        localStorage.removeItem('historySearch')
        // Cookie.remove('historySearch')
        this.historySearch = []
      },
      clickKeyWord(keyword){
        this.$router.push({name:'searchResult',query:{inputWord:keyword}})
      }

    }

  }

</script>


<style lang="less" scoped>
  .search-container{
    width: 100%;
    height: 100vh;
    background-color: white;

    .history-search{
      padding-top: 45px;


      .history-search-head{
        display: flex;
        width: 100%;
        height: 30px;
        justify-content: space-between;
        align-items: center;

        div{
          margin: 0px 10px;
        }
      }

      .history-search-content{
        display: flex;
        justify-content: flex-start;
        flex-flow:wrap;
        align-items: flex-start;
        align-content: flex-start;
        height: 300px;
        padding: 0 10px;

        div{
          display: flex;
          /*width: 50px;*/
          height: 30px;
          background-color: #e6e6e6;
          margin:5px 6px;
          border-radius: 2px;
          justify-content: center;
          align-items: center;
          color: #666666;
          padding: 0 10px;

        }
      }

    }
  }


</style>
