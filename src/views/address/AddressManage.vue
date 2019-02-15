<template>
    <div class="addressManage" :style="{height: getHeight + 'px'}">
        <div class="addressCard" v-for="item in address" :key="item.phone">
            <div class="container_top" @click="selectAdress(item)">
                <div class="name_phone">{{item.name}}&emsp;&emsp;{{item.phone}}</div>
                <div class="address">{{item.addressArea+item.addressDetail}}</div>
            </div>
            <div class="container_bottom">
                <div class="check" @click="changechecked(item)">
                    <check-icon :value.sync="item.checked">默认地址</check-icon>
                </div>
                <div class="button">
                    <div class="edit" @click="editAddress(item)">
                        <img src="../../assets/img/addressManage/edit.png" alt="编辑"><div>编辑</div>
                    </div>
                    <div class="delete">
                        <img src="../../assets/img/addressManage/delete.png" alt="删除"><div>删除</div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 添加收货地址 -->
        <div class="addAddress" @click="addAddress">新增收货地址</div>
    </div>
</template>
<script>
import { CheckIcon } from 'vux'
export default {
    components: { CheckIcon },
    data () {
        return {
            address: [
                {
                    addressId:1,
                    name: '张三',
                    phone: '132489873190',
                    addressArea:'广东省佛山市禅城区石湾街道',//所在地区
                    addressDetail: '岭南天地',//详细地址
                    checked: true
                },
                {
                    addressId:2,
                    name: '李四',
                    phone: '132489873191',
                    addressArea:'广东省佛山市禅城区石湾街道',//所在地区
                    addressDetail: '建新路',//详细地址
                    checked: false
                },
                {
                    addressId:3,
                    name: '王五',
                    phone: '132489873192',
                    addressArea:'广东省佛山市禅城区石湾街道',//所在地区
                    addressDetail: '祖庙',//详细地址
                    checked: false
                }
            ],
          // isBacktoOrder:false,//是否返回上个页面

        }
    },
    computed: {
        getHeight () {
            return window.innerHeight
        }
    },
    created () {

    },
    methods: {
        getAddress () {
            let that = this
            let promise = new Promise((resolve, reject) => {
                that.axios.get('/api/?ak=2khXIrm9hxmyO7VKEWSrcisX&location=23.1095,113.586502&output=json')
                    .then((res)=>{
                        console.log(res.data.result)
                        let index = 1;
                        resolve(index,res.data.result)}
                    )
            })
            promise.then((index,res)=>{
                console.log('res',res)
                console.log('index',index);
            })
        },
        changechecked (item) {
            console.log(item)
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
            this.$router.push({name:'payPage'})
          }
        }
    }
}
</script>
<style lang='less'>
    .addressManage{
        width: 100vw;
        background-color: #e5e5e5;
        font-size: 14px;
        border-top: #e5e5e5 1px solid;
        box-sizing: border-box;
        .addressCard{
            height: 100px;
            padding: 0 10px;
            background-color: #fff;
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            //姓名 电话 地址
            .container_top{
                width: 100%;
                display: inline-flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                height: 60px;
                border-bottom: #e5e5e5 1px solid;
                box-sizing: border-box;
                .name_phone{
                    color: rgb(51, 51, 51)
                }
                .address{
                    font-size: 12px;
                    color: rgb(128, 128, 128);
                }
            }
            //编辑删除
            .container_bottom{
                width: 100%;
                height: 40px;
                font-size: 12px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .check {
                    position: relative;
                    left: -5px;
                    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
                        color:#995454;
                    }
                }
                img{
                    width: 16px;
                    height: 15.5px;
                    margin: 0 5px;
                }
                .edit,.delete{
                    display: inline-flex;
                    align-items: center;
                    width: 55px;
                    height: 20px;
                    color: rgb(128, 128, 128);
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
