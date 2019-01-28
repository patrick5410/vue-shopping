<!--该组件用于计算除去头部和底部菜单栏剩余高度-->
<template>
  <div class="order-container" :style="{ height: remainHeight + 'px' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      remainHeight: 100 //剩余高度
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.remainHeight =
        window.innerHeight -
        window.document.getElementById('header').clientHeight -
        window.document.getElementById('menu').clientHeight
    })
  }
}
</script>
