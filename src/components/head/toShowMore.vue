<template>
  <div class="head" id="head">
    <div>综合</div>
    <div>
      价格
      <div class="sort-div">
        <!--升序-->
        <div class="sort-add"></div>
        <!--降序-->
        <div class="sort-cut"></div>
      </div>
    </div>
    <div>销量</div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss">
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
    border-color:transparent transparent #000 transparent ;
    width: 0;
    height: 0;
  }

  .sort-cut{
    border-style: solid dashed dashed dashed;
    border-width: 8px 8px 8px 8px;
    border-color:#6c6c6c transparent transparent transparent ;
    width: 0;
    height: 0;
  }

</style>
