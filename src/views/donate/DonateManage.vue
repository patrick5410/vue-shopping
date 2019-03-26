<template>
    <div class="addressManage" >
        <div class="addressCard" v-for="item in books" :key="item.receivePhone">
              <div class="createTime_status">
                <div>{{item.createTime}}</div>
                <div class="status">{{item.status}}</div>
              </div>

              <div class="bookName_bookCount">
                <div class="bookName_bookCount1">
                  <div>{{item.bookName}}</div>
                  <div class="count">x{{item.count}}</div>
                </div>

                  <div class="name_phone">个人信息：{{item.userName}}&emsp;{{item.phone}}</div>

              </div>
              <div class="gainScore">获得积分：{{item.gainScore}}</div>
        </div>
        <!-- 添加收货地址 -->
        <div id="goDonateBooks" class="goDonateBooks" @click="goDonateBooks">去捐书</div>
    </div>
</template>
<script>
import { CheckIcon,Icon  } from 'vux'
export default {
    components: { CheckIcon,Icon },
    data () {
        return {
          containerHeight:1200,//内容宽度
          books:[{
            createTime:new Date(),
            status:'审核',
            bookName:'钢铁是怎样炼成的？',
            count:10,
            userName:'陈小春',
            phone:'1324554844',
            gainScore:20
          },{
            createTime:new Date(),
            status:'待审核',
            bookName:'摄影大全',
            count:30,
            userName:'朴智妍',
            phone:'13269874569',
            gainScore:30
          },{
            createTime:new Date(),
            status:'审核',
            bookName:'二维动画设计',
            count:1000,
            userName:'朴孝敏',
            phone:'13625698746',
            gainScore:40
          }
          ]
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
      this.$nextTick(function () {
        this.containerHeight =  window.innerHeight - window.document.getElementById('addAddress').clientHeight ;
      })
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
      goDonateBooks(){
          //跳转到添加地址页面
          //this.$store.state.choosedAddress = null;
          this.$router.push({name:'donateBooks'})
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
        width: 100vw;
        height: 100vh;
        background-color: #e5e5e5;
        font-size: 14px;
        border-top: #e5e5e5 1px solid;
        overflow: scroll;
        padding-bottom: 46px;


        .addressCard {
          /*height: 95px;*/
          /*padding: 0 10px;*/
          background-color: #fff;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          //姓名 电话 地址
          .createTime_status {
            /*padding: 0 10px;*/
            margin: 0 10px;
            width: 355px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e5e5;

            .status {
              color: rgb(153, 84, 84)
            }
          }

          .bookName_bookCount {
            padding:5px 10px;
            width: 100%;
            /*height: 50px;*/
            /*border-top: #e5e5e5 1px solid;*/
            border-bottom: 1px solid #e5e5e5;
            //align-items: center;
            .count {
              color: rgb(153, 84, 84)
            }

            .bookName_bookCount1 {
              display: flex;
              justify-content: space-between;
            }

            .name_phone{
              text-align: left;
            }
          }

          .gainScore {
            padding: 0 10px;
            width: 100%;
            height: 30px;
            /*border-top: #e5e5e5 1px solid;*/
            text-align: right;
            color: #3d7a99;
            line-height: 30px;
          }
        }
        //添加地址按钮
        .goDonateBooks{
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
