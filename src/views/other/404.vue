<!--404页面-->
<template>
  <div class="not-can-find-container">
    <div class="content">
      <h1>盟友淘</h1>
      <div class="img-div">
        <img src="../../assets/img/banner404.png">
      </div>
      <div class="bottom-div">
        <div class="h2">
          抱歉，找不到页面！<a href="/shopping/index">点击这里</a>回到首页
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .not-can-find-container{
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/img/bg404.png");
    /*border-top: 1px solid white;*/

    .content{
      padding-top: 10px;

      h1{
        text-align: center;
        /*margin-top: 20px;*/
        color: #603813;
        font-size: 2em;
        text-transform: uppercase;
        font-weight: bold;
      }

      .img-div{
        width: 100%;
        height: 70vh;
        margin-top: 10px;

        img{
          height: 100%;
          width: auto;
        }
      }

      .bottom-div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 30px;
        .h2 {
          font-size: 1.65em;
          color: rgb(99, 44, 37);
          font-weight: bold;
        }
      }

    }
  }
</style>
