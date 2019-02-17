<template>
    <div class="header" id="header">
        <input v-bind:class="{searchInput:$route.path.indexOf('search') != -1}"  type="text" placeholder="搜索商品" v-on:focus="toSearch"  ref="searchInput" v-model="keyword">
        <div class="search" @click="search">搜索</div>
    </div>

</template>
<script>

  import  { ToastPlugin } from 'vux'
  import Vue from 'vue'
  Vue.use(ToastPlugin)
  export default {
    data(){
      return{
        keyword:'',// 搜索关键字
      }
    },
    created(){
      if(this.$route.query.keyword){
        this.keyword = this.$route.query.keyword
      }
    },
    methods:{
      toSearch(){
        if(this.$route.path.indexOf('search$') == -1){
          console.log("跳转到搜索页面",this.$route.path.indexOf('search'))
          //不是在搜索页面就跳转
          this.$router.push({name:'search',query:{keyword:this.keyword}})
        }
      },
      search(){
        // console.log("执行点击事件",this.keyword,localStorage.getItem('historySearch'))
        try{

          if(this.keyword.trim() != ""){
            let historySearch = []
            if(localStorage.getItem('historySearch')){
              historySearch = JSON.parse(localStorage.getItem('historySearch'))
            }

            let isRepeat = false
            historySearch.forEach((item)=>{
              if(this.keyword == item){

                //重复关键字不再记录
                isRepeat = true
                return ;
              }
            })
            if(!isRepeat){
              historySearch.unshift(this.keyword)
              console.log("historySearch",historySearch,historySearch.length)
              if(historySearch.length>10){
                //只保存10个搜索记录
                historySearch = historySearch.slice(0,10)
              }

              localStorage.setItem('historySearch',JSON.stringify(historySearch))
            }
            this.$router.push({name:'searchResult',query:{keyword:this.keyword}})
          }else {
            this.$vux.toast.show({
              type:'text',
              text: '请输入您要搜索的商品',
              width:'15em'
            })
            this.keyword = ""
          }

        }catch (e) {
          console.log("出现异常",e)
          //出现异常就清除缓存数据
          localStorage.removeItem('historySearch')
        }

      }

    }
  }
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        top: 0;
        height: 36px;
        width: 100%;
        background-color: white;
        border-bottom: #e5e5e5 1px solid;
        box-sizing: border-box;
        z-index: 100;


      input{
        height: 28px;
        width: 330px;
        font-size: 12px;
        background-color: #e5e5e5;
        background-image: url('../../assets/img/search.png');
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position-x: 5px;
        background-position-y: center;
        border-radius: 3px ;
        outline: none;
        border: 0;
        padding-left:25px;



      }


      .searchInput{
        width: 270px;

        /*搜索按钮*/
        +div{
          display: flex;
        }

      }







      .search{
        display: none;
        margin-left: 10px;
        width: 50px;
        height: 28px;
        background-color: #995454;
        color: white;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        border-radius: 1px;
      }




    }
</style>
