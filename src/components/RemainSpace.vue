<!--该组件用于计算除去头部和底部菜单栏剩余高度-->
<template>
  <div class="order-container">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        remainHeight:100//剩余高度
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        console.log("各个元素的高度",window.innerHeight,window.document.getElementById('header').clientHeight,window.document.getElementById('menu').clientHeight)
        this.remainHeight =  window.innerHeight - window.document.getElementById('header').clientHeight -window.document.getElementById('menu').clientHeight ;
      })
    }
  }
</script>

<style lang="scss" scoped>
   .order-container{
     position: absolute;
     top: 35px;
     bottom: 60px;
     left: 0;
   }
</style>

