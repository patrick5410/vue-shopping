<template>
  <div class="addressManage" >
   <div class="big">
    <div class="addressCard" v-for="item in bookManage">
      <div class="container_top">
        <img src="https://www.kfzimg.com/G06/M00/24/12/p4YBAFqaYjWAAUCsAADI9fBJ77U475_s.jpg">
      </div>
      <div class="button">
        <div class="onSell">
          <XSwitch size="large">
            <span slot="open">上架</span>
            <span slot="close">下架</span>
          </XSwitch>
        </div>
        <div class="bottom-right">
          <div class="edit" @click="editAddress(item)">
            <img src="../../assets/img/addressManage/edit.png" alt="编辑"><div>编辑</div>
          </div>
          <div class="delete" @click="deleteAddress(item)">
            <img src="../../assets/img/addressManage/delete.png" alt="删除"><div>删除</div>
          </div>
        </div>

      </div>
    </div>
   </div>
    <!--<div class="addressCard" v-for="item in $store.state.addresses" :key="item.receivePhone">
      <div class="container_top" @click="selectAdress(item)">
        <div class="name_phone">{{item.receiveName}}&emsp;&emsp;{{item.receivePhone}}</div>
        <div class="address">{{handleStr(item.addressArea+item.addressDetail)}}</div>
        <div class="order-check" v-show="$store.state.order && item.addressId === $store.state.order.addressInfo.addressId">
          <icon type="success-no-circle"></icon>
        </div>
      </div>
      <div class="container_bottom">
        <div class="check" @click="changechecked(item)">
          <check-icon :value.sync="item.isDefault">默认地址</check-icon>
        </div>
        <div class="button">
          <div class="edit" @click="editAddress(item)">
            <img src="../../assets/img/addressManage/edit.png" alt="编辑"><div>编辑</div>
          </div>
          <div class="delete" @click="deleteAddress(item)">
            <img src="../../assets/img/addressManage/delete.png" alt="删除"><div>删除</div>
          </div>
        </div>

      </div>
    </div>-->
    <!-- 添加收货地址 -->
    <!--<div id="addAddress" class="addAddress" @click="addAddress">新增书籍</div>-->
  </div>
</template>
<script>
  import { CheckIcon,Icon  } from 'vux'
  // import {FormItem,Switch} from 'element-ui'
  import {Switch} from 'iview'
  export default {
    components: {
      CheckIcon,
      Icon,
      XSwitch:Switch
    },
    data () {
      return {
        bookManage:[{
          picture:'13213345345',
          word:'gjghjghjgkjgh',
          onSell:false
        },
        {
          picture:'13213345345',
          word:'gjghjghjgkjgh',
          onSell:true
        }
        ],
        containerHeight:1200//内容宽度
      }
    },
    computed: {
      getHeight () {
        return window.innerHeight
      }
    },
    created () {

    },
    mounted: function () {
      // this.$nextTick(function () {
      //   this.containerHeight =  window.innerHeight - window.document.getElementById('addAddress').clientHeight ;
      // })
    },
    methods: {
      getAddress () {

      },
      changechecked (item) {
        console.log(item)
        let that = this
        that.$store.commit("setDefaultAddress",{ data: {
            addressId: item.addressId
          }
          ,successCallBack:function () {
            // that.$vux.toast.show({
            //   text: '添加成功'
            // })
            // 取消默认地址
            for (let i = 0; i < that.$store.state.addresses.length; i++) {
              that.$store.state.addresses[i].isDefault = false
            }
            //设置默认地址
            item.isDefault = true
          },failCallBack:function () {
            that.$vux.toast.show({
              type: 'warn',
              text: '设置失败'
            })
          } })
      },
      addAddress(){
        //跳转到添加地址页面
        this.$store.state.choosedAddress = null;
        this.$router.push({name:'addressEdit'})
      },
      editAddress(item){
        //编辑地址
        this.$store.state.choosedAddress = item;
        this.$router.push({name:'addressEdit'})
      },
      selectAdress(item){
        //判断上个地址是否是订单页面
        if(this.$store.state.order != null){
          //选择该地址作为订单地址
          this.$store.state.choosedAddress = item;
          console.log("选择的地址",item)
          this.$store.state.order.addressInfo = item
          this.$router.push({name:'payPage'})
        }
      },
      deleteAddress(item){
        //删除地址
        let that = this
        this.$store.commit("deleteAddress",{ data: { addressId: item.addressId },successCallBack:function () {
            //刷新地址
            that.$store.commit('getAddresses')
          },failCallBack:function () {
            that.$vux.toast.show({
              type:"cancel",
              text: '删除失败'
            })

          } })

      },
      /**
       * 出来地址字符串
       * @param address
       */
      handleStr(address){
        if(address.length>25){
          return address.substr(0,25)+"..."
        }else {
          return address
        }
      }
    }
  }
</script>
<style lang='less'>
  .addressManage{
    width: 375px;
    height: auto;
    background-color: #e5e5e5;
    font-size: 14px;
    border-top: #e5e5e5 1px solid;
    overflow: scroll;
    padding-bottom: 46px;
    .big{
      width:355px;
      height: auto;
      margin: 0px 10px;
      display: flex;
      justify-content: space-between;

      .addressCard{
        width: 170px;
        background-color: #fff;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        box-shadow: 0 0.133333rem 0.266667rem 0 rgba(0, 0, 0, 0.4);
        border-radius: 0.15rem;
        //姓名 电话 地址
        .container_top{
          width: 170px;
          display: inline-flex;
          flex-direction: column;
          /*align-items: flex-start;*/
          /*justify-content: center;*/
          height: 170px;
          border-bottom: #e5e5e5 1px solid;
          box-sizing: border-box;
          position: relative;

          justify-content: center;
          align-items: center;

          img{
            height: 90%;
            width: auto;
            max-width: 90%;
          }

          .name_receivePhone{
            color: rgb(51, 51, 51)
          }
          .address{
            font-size: 12px;
            color: rgb(128, 128, 128);
          }
        }
      }
      .button{
        width: 170px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .onSell{
          margin-left: 3px;
        }

        img{
          width: 16px;
          height: 15.5px;
          margin: 0 5px;
        }

        .bottom-right{
          /*width: 120px;*/
          margin-right: 2px;

          .edit,.delete{
            display: inline-flex;
            align-items: center;
            width: 50px;
            height: 20px;
            color: rgb(128, 128, 128);
            img{
              margin: 0 2px;
            }
          }
        }

      }
    }

    //添加地址按钮
    .addAddress{
      background-color: #e4393c;
      color: #fff;
      font-size: 16px;
      -webkit-box-flex: 1;
      flex: 1;
      height: 46px;
      line-height: 46px;
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }

</style>
