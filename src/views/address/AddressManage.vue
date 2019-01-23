<template>
    <div class="addressManage" :style="{height: getHeight + 'px'}">
        <div class="addressCard" v-for="item in address" :key="item.phone">
            <div class="container_top">
                <div class="name_phone">{{item.name}}&emsp;&emsp;{{item.phone}}</div>
                <div class="address">{{item.address}}</div>
            </div>
            <div class="container_bottom">   
                <div class="check" @click="changechecked(item)">
                    <check-icon :value.sync="item.checked">默认地址</check-icon>      
                </div> 
                <div class="button">
                    <div class="edit"> 
                        <img src="/img/addressManage/edit.png" alt="编辑"><div>编辑</div>
                    </div>
                    <div class="delete">
                        <img src="/img/addressManage/delete.png" alt="删除"><div>删除</div>
                    </div>
                </div>          
                                
            </div>
        </div>
        <!-- 添加收货地址 -->
        <div class="addAddress" @click="getAddress">新增收货地址</div>
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
                    name: '某某某',
                    phone: '132489873190',
                    address: '广东省佛山市禅城区季华二路国家火炬创新创业园',
                    checked: true
                },
                {
                    name: '某某某',
                    phone: '132489873191',
                    address: '广东省佛山市禅城区季华二路国家火炬创新创业园',
                    checked: false
                },
                {
                    name: '某某某',
                    phone: '132489873192',
                    address: '广东省佛山市禅城区季华二路国家火炬创新创业园',
                    checked: false
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
