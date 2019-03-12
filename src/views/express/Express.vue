<!--快递页面-->
<template>
  <div class="express-container" v-html="htmlContent">

  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        htmlContent:""
      }
    },
    created(){
      let that = this
      // $.ajax({
      //   url:"http://www.kdniao.com/JSInvoke/MSearchResult.aspx?expCode=YTO&expNo=804594624802595017&sortType=DESC&color=rgb(46,114,251)&backUrl=http://www.tdxiov.com/shopping/orderDetail?orderId=TDX20190228132116211",
      //   type:"get",
      //   success:function (data) {
      //     console.log(data);
      //     that.htmlContent = data
      //   },
      //   fail:function (data) {
      //     console.log("请求出错",data)
      //   }
      //
      // })
    },
    methods:{

    }
  }
</script>
