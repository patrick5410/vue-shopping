<!--申请捐书-->
<template>
  <div class="addressEdit-container">
    <div style="width: 100%;background-color: white;padding-bottom: 20px">
      <div class="good-common">
        <div>书名</div>
        <div>
          <input class="input-word"  type="text" maxlength="10"  placeholder="书名" v-model.trim="donate.bookName">
        </div>
      </div>
      <div class="good-common">
        <div>书籍类型</div>
        <div>
          <input class="input-word"  type="text" maxlength="11"  placeholder="书籍类型" v-model.trim="donate.bookType">
        </div>
      </div>
      <div class="good-common">
        <div>捐赠数量</div>
        <div class="selectAddress">
          <div>
            <input class="input-word"  type="text" maxlength="11"  placeholder="捐赠数量" v-model.trim="donate.bookNumber">
          </div>
        </div>
      </div>
      <div class="good-common">
        <div>联系方式</div>
        <div>
          <input class="input-word"  type="text" maxlength="11"  placeholder="联系方式" v-model.trim="donate.phone">
        </div>
      </div>
      <div class="good-common">
        <div>姓名</div>
        <div>
          <input class="input-word"  type="text" maxlength="11"  placeholder="姓名" v-model.trim="donate.donateUserName">
        </div>
      </div>
      <div class="good-common">
        <div>预约时间</div>
        <div class="date-time">
          <DatePicker v-model="dateTime" type="datetime" placeholder="选择日期时间"></DatePicker>
        </div>
      </div>

      <div class="confirm" @click="confirm">
        {{donate.addressId == -1?'确认捐赠':'确认修改'}}
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
  import '../../assets/css/address.css'
  import Vue from 'vue'
  import { ToastPlugin } from 'vux'
  import { DatePicker } from 'element-ui'

  Vue.use(ToastPlugin)

  export default {
    components:{
      DatePicker
    },
    data(){
      return{
        donate:{
          addressId:-1,
          bookName: '',//书名
          bookType: '',//书籍类型
          bookNumber:'',//捐赠数量
          phone: '',//联系方式
          donateUserName:'',//捐赠者姓名
          checked: false,
        },
        dateTime:''
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

        if(this.donate.bookName =="" || this.donate.bookType == "" ||this.donate.bookNumber =="" || this.donate.donateUserName ==""||this.donate.phone==""||this.dateTime==""){
          //收货信息不能为空
          // 显示
          this.$vux.toast.show({
            text: '请完善捐赠信息',
            type:'warn',
            width:'10em'
          })
          return
        }else{
          this.$router.push({name:'donateDetails'})
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

      .date-time{
        margin: 0 10px;
        width: 75%;
        display: flex;
        justify-content: flex-start;
      }
      .input-word{
        display: block;
        width: 260px;
        font-size: 14px;
        vertical-align:middle;
        outline: none;
        border: 0;
        margin: auto 0;
        padding: .1rem 0;
      }
    }

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
