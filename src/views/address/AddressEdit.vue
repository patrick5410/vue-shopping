<!--添加或编辑地址-->
<template>
  <div class="addressEdit-container">
    <div style="width: 100%;background-color: white;padding-bottom: 20px">
      <div class="good-common">
        <div>收货人</div>
        <div>
          <input class="input-word"  type="text" maxlength="10"  placeholder="姓名">
        </div>
      </div>
      <div class="good-common">
        <div>联系方式</div>
        <div>
          <input class="input-word"  type="text" maxlength="11"  placeholder="手机号码">
        </div>
      </div>
      <div class="good-common">
        <div>所在地区</div>
        <div class="selectAddress">
          <label for="Addr" id="areaLabel" class="address" style="border: 0">
            <input type="text" name="Addr" id="Addr" style="width: 7.7rem;height: 1rem;font-size: .37rem;border: 0" readonly placeholder="请选择地区" v-model="address">
          </label>
        </div>
      </div>

      <div class="good-common">
        <div>详细地址</div>
        <div>
          <input class="input-word" type="text" placeholder="详细地址需填写楼栋楼层或房间号">
        </div>
      </div>

      <div class="confirm" @click="confirm">
        确认
      </div>
    </div>


    <!--选择弹出框-->
    <div id="addressSelectWrapper" style="z-index: 9999;text-align: left">
      <div id="addressSelect">
        <div class="tip">
          <h3>所在地区</h3>
          <button type="button" id="cancel" class="cancel"></button>
        </div>
        <div id="address">
          <ul class="selected-address">
            <li class="lastarea" id="lastprovince">请选择</li>
            <li class="lastarea" id="lastcity">请选择</li>
            <li class="lastarea" id="lastarea">请选择</li>
            <li class="lastarea" id="lasttown">请选择</li>
          </ul>
          <div class="address-content">
            <ul class="province" id="province"></ul>
            <ul class="city" id="city"></ul>
            <ul class="area" id="area"></ul>
            <ul class="town" id="town"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../css/address.css'

  export default {
    data(){
      return{
        address:'123'
      }
    },
    methods:{
      confirm:function () {
        console.log("address",this.address,window.document.getElementById("Addr").value)
      }

    }
  }










  //初始化地址选择
  function initAddress() {
    $("#Addr").cityLinkage({
      containerId: "addressSelectWrapper",
      getSelectedCode: function () {
        return $("#Addr").data("code");
      },
      callback: function (data) {
        $("#Addr").val(data.addr).data("code", data.code);
      }
    });
  }

  $(function () {
    // 地址选择器遮罩层打开与关闭
    $("#areaLabel").click(function (e) {
      // console.log("弹出地址框");
      $("#addressSelectWrapper").show();
      e.stopPropagation();
    });
    $(document).click(function () {
      $("#addressSelectWrapper").hide();
    });
    $("#cancel").click(function () {
      $("#addressSelectWrapper").hide();
    });
    $("#addressSelect").click(function (e) {
      e.stopPropagation();
    });

    initAddress();

  });

</script>

<style lang="less" scoped>



  .addressEdit-container{
    width: 100%;
    height: 100vh;
    background-color: #e5e5e5;
    font-size: 14px;

    .good-common{
      display: flex;
      height: 40px;
      width: 355px;
      padding: 0 10px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      background-color: white;
      div:first-child{
        color: #808080;
      }

      .input-word{
        width: 290px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        vertical-align:middle;
        outline: none;
        border: 0;
        margin: auto 0;
      }
    }

    /*.selectAddress{*/
      /*width: 200px;*/
      /*height: 40px;*/


      /*.Addr{*/
        /*width: 50px;*/
      /*}*/
    /*}*/

    .confirm{
      display: flex;
      width: 350px;
      height: 45px;
      margin:10px auto;
      background-color: #e4393c;
      color: white;
      border-radius: 2px;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }



  }


</style>
