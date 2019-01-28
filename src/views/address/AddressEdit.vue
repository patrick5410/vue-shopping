<!--添加或编辑地址-->
<template>
  <div class="addressEdit-container">
    <div style="width: 100%;background-color: white;padding-bottom: 20px">
      <div class="good-common">
        <div>收货人</div>
        <div>
          <input class="input-word"  type="text" maxlength="10"  placeholder="姓名" v-model.trim="address.name">
        </div>
      </div>
      <div class="good-common">
        <div>联系方式</div>
        <div>
          <input class="input-word"  type="text" maxlength="11"  placeholder="手机号码" v-model.trim="address.phone">
        </div>
      </div>
      <div class="good-common">
        <div>所在地区</div>
        <div class="selectAddress">
          <label for="Addr" id="areaLabel" class="address" style="border: 0">
            <input type="text" name="Addr" id="Addr" style="width: 7.7rem;height: 1rem;font-size: .37rem;border: 0" readonly placeholder="请选择地区"  v-model="address.addressArea">
          </label>
        </div>
      </div>

      <div class="good-common">
        <div>详细地址</div>
        <div>
          <input class="input-word" type="text" placeholder="详细地址需填写楼栋楼层或房间号" v-model.trim="address.addressDetail">
        </div>
      </div>

      <div class="confirm" @click="confirm">
        {{address.addressId == -1?'确认添加':'确认修改'}}
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
  import Vue from 'vue'
  import { ToastPlugin } from 'vux'

  Vue.use(ToastPlugin)

  export default {
    data(){
      return{
        address:{
          addressId:-1,
          name: '',
          phone: '',
          addressArea:'',//所在地区
          addressDetail: '',//详细地址
          checked: false
        }
      }
    },
    computed:{
      //获取所在地区
      getAddressArea:function () {
        if(this.$store.state.choosedAddress){
          return this.$store.state.choosedAddress.addressArea
        }
        return ""
      }
    },
    watch:{

    },
    created(){
      if(this.$store.state.choosedAddress){
        this.address =  this.$store.state.choosedAddress
      }

      // this.matches();
    },
    mounted: function () {
      this.$nextTick(function () {
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

        this.initAddress();
      })
    },
    beforeDestroy() {
      // console.log("页面跳转之前");
      this.$store.state.choosedAddress = null
    },
    methods:{
      confirm:function () {
        // this.address.addressArea = window.document.getElementById("Addr").value;

        if(this.address.name =="" || this.address.phone == "" ||this.address.addressArea =="" || this.address.addressDetail ==""){
          //收货信息不能为空
          // 显示
          this.$vux.toast.show({
            text: '请完善收货信息',
            type:'warn',
            width:'10em'
          })
          return
        }

        console.log("提交前的address",this.address)

        if(this.address.addressId == -1){
          //添加

        }else {
          //修改

        }

      },
      //初始化地址选择
      initAddress:function () {
        let that = this
        $("#Addr").cityLinkage({
          containerId: "addressSelectWrapper",
          getSelectedCode: function () {
            return $("#Addr").data("code");
          },
          callback: function (data) {
            console.log("data.addr",data.addr)
            that.address.addressArea = data.addr
            $("#Addr").val(data.addr).data("code", data.code);
          }
        });
      },
      addressChange(val){
        console.log("val",val)
      },
      async matches() {
        // 这里用try catch包裹，请求失败的时候就执行catch里的
        try {
          console.log("api",this)
          console.log("api",this.$api)
          let res = await this.$api.user.getUserInfo({code:'huhfai'})
          console.log('​getMatches -> res', res)
        } catch (e) {
          console.log('​catch -> e', e)
        }
      }

    }
  }

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
        display: block;
        width: 290px;
        /*height: 20px;*/
        /*line-height: 20px;*/
        font-size: 14px;
        vertical-align:middle;
        outline: none;
        border: 0;
        margin: auto 0;
        padding: .1rem 0;
        /*padding-top: 0.1rem;*/
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
