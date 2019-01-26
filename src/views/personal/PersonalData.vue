<!--个人资料-->
<template>
  <div class="personalData-container">
    <div class="title">基础资料</div>
    <div class="content">
      <div>头像</div>
      <div class="head-img-div">
        <img class="head-img" src="../../assets/img/head-img.jpg">
      </div>
    </div>
    <div class="content">
      <div>账号</div>
      <div>
        1234567890
      </div>
    </div>
    <div class="content">
      <div>昵称</div>
      <div>
        盟友淘
      </div>
    </div>

    <div class="encrypted-data">
      <div class="title">密保资料</div>
      <div class="content">
        <div>手机号码</div>
        <div>
          13425816564
        </div>
      </div>
      <div class="content">
        <div>账号安全</div>
        <div>
          1234567890
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/Menu'

  export default {
    components: {
      Menu
    }

  }

</script>


<style lang="less" scoped>
  .personalData-container{
    width: 100%;
    height: 100vh;
    background-color: #e5e5e5;

    .title{
      display: flex;
      width: 355px;
      height: 30px;
      margin: 0 auto;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      color: #808080;

    }


    .content{
      display: flex;
      width: 355px;
      height: 50px;
      padding: 0 10px;
      background-color: white;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      border-top: 1px solid #e5e5e5;

      div:first-child{
        margin-left: 15px;
      }

      div:nth-child(2){
        color: #808080;
      }

    }

    .head-img-div{
      /*height: 50px;*/
      /*width: 50px;*/
      /*!*background-color: blue;*!*/
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .head-img{
        height: 40px;
        width: 40px;
        border-radius: 100%;
      }

    }

    .encrypted-data{
      margin-top: 30px;

    }

  }




</style>
