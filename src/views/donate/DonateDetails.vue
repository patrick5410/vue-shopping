<!--退货进度详情-->
<template>
    <div class="returnDetail-container">
        <div id="head-container">
            <div class="head">
                <div>
                    <img src="../../assets/img/return_info.png" style="width:.6rem;margin-right: .2rem"/>退货信息
                </div>
            </div>
            <div class="head-info">
                <div class="common">
                    <div>书名</div>
                    <div>{{details.bookName}}</div>
                </div>
                <div class="common">
                    <div>书籍类型</div>
                    <div>{{details.bookType}}</div>
                </div>
                <div class="common">
                    <div>捐赠数量</div>
                    <div>{{details.donateNumber}}</div>
                </div>
                <div class="common">
                    <div>联系方式</div>
                    <div>{{details.phone}}</div>
                </div>
              <div class="common">
                <div>姓名</div>
                <div>{{details.donateUserName}}</div>
              </div>
              <div class="common">
                <div>预约时间</div>
                <div>{{details.dateTime}}</div>
              </div>
            </div>

            <div class="process">
                <Step v-model="returnState" background-color='#fbf9fe'>
                    <StepItem title="待审核"></StepItem>
                    <StepItem title="已审核"></StepItem>
                    <StepItem title="已寄回"></StepItem>
                    <StepItem title="退款中"></StepItem>
                    <StepItem title="已完成"></StepItem>
                </Step>
            </div>
        </div>


        <!--上面进度条div影响到后面的div，只能增加一个外层div使用绝对路径清除上面div的影响-->
        <div id="remain-space">
            <!--<div class="express-info" v-if="returnState >1">-->
                <!--<div class="no-deliveryId" v-if="!details.deliveryId">-->
                    <!--<Group gutter="0">-->
                        <!--<XInput title="" v-model="details.deliveryId" placeholder="请输入快递单号" text-align="center" :max="25" required class="express-input"></XInput>-->
                    <!--</Group>-->
                    <!--<div class="address">联系人：{{details.donateUserName}}&nbsp;&nbsp;电话：{{details.phone}}</div>-->
                    <!--<div class="address">寄回地址：{{details.receiveAddress}}</div>-->
                    <!--<div class="bottom-pane">-->
                        <!--<div @click="details.deliveryId=''">清空</div>-->
                        <!--<div class="confirm" @click="confirm(details.deliveryId)">提交</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div v-else class="delivery-div">-->
                    <!--<div>-->
                        <!--<div class="delivery"  @click="openDelivery":style="showContent?'':'red:white'">快递单号：{{details.deliveryId}}</div>-->
                    <!--</div>-->
                    <!--<div class="delivery-slide" :class="showContent?'delivery-animate':''">-->
                        <!--<div class="address">联系人：{{details.donateUserName}}&nbsp;&nbsp;&nbsp;电话：{{details.phone}}</div>-->
                        <!--<div class="address">寄回地址：{{details.receiveAddress}}</div>-->
                        <!--<div class="bottom-pane" v-if="details.returnState === 2" >-->
                            <!--&lt;!&ndash;<Group style="width: 70%;" gutter="0">&ndash;&gt;-->
                                <!--&lt;!&ndash;<XInput title="" v-model="reDeliveryId" placeholder="修改快递单号" text-align="center" :max="25" required class="express-input" style="border: 0"></XInput>&ndash;&gt;-->
                            <!--&lt;!&ndash;</Group>&ndash;&gt;-->
                            <!--<input v-model="reDeliveryId" placeholder="输入修改快递单号"  :max="25" required class="express-input" style="border: 0"></input>-->
                            <!--<div class="confirm" @click="confirm(reDeliveryId)">修改</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

            <!--</div>-->

            <!--占位-->
            <div class="placeholder"></div>



            <div class="process-detail">
                <img src="../../assets/img/process.png" style="width:.6rem;margin-right: .2rem"/>处理进度
            </div>
            <div class="process-info">
                <timeline>
                    <timeline-item v-for="(item,index) in auits">
                        <div>{{item.message}}</div>
                        <div class="process-date" :class="{firsrtDate: index===0}">{{item.createDate}}</div>
                    </timeline-item>
                </timeline>
            </div>
        </div>


        <div class="service">
            <img src="../../assets/img/service.png"/>联系客服
        </div>
    </div>
</template>

<script>

    // import {Step,Steps} from 'element-ui'
    import Step from '../../components/Step'
    import StepItem from '../../components/StepItem'
    import Timeline from '../../components/Timeline'
    import TimelineItem from '../../components/TimelineItem'
    import { XInput,Group,Cell } from 'vux'
    import { ToastPlugin,LoadingPlugin } from 'vux'
    import Vue from 'vue'

    Vue.use(ToastPlugin,LoadingPlugin)

    // import { Timeline, TimelineItem } from 'vux'

    export default {

        components: {
            Step,
            StepItem,
            Timeline,
            TimelineItem,
            XInput,
            Group,
            Cell
        },
        data () {
            return {
              returnState:2,
              details:{
                bookName:'高等数学',
                bookType:'数学',
                donateNumber:100,
                phone:'13698756326',
                donateUserName:'陈健',
                dateTime:'2019-01-12',
                deliveryId:'263987546321552',
                returnState:2,
                receiveAddress:'广东省佛山市'
              },
              auits:[{
                message:'已审核',
                createDate:new Date()
              },
                {
                  message:'未审核',
                  createDate:new Date()
                }
              ],
                // state:2,
                deliveryId:"",
                reDeliveryId:"",
                showContent: false,
                remainHeight:775
            }
        },
        computed: {
            getDeliveryId(){
                return this.details.deliveryId
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // this.remainHeight = window.innerHeight-window.document.getElementById("head-container").clientHeight;
            })
        },
        watch: {
            getDeliveryId:function (val) {
                this.deliveryId = val
            }
        },
        methods:{
            openDelivery(){
                this.showContent = !this.showContent
            },
            confirm(deliveryId){
                //修改快递单号
                let that = this
                this.$store.commit('updateDeliveryId', { data: {returnGoodId:that.$store.state.returnGoodDetail.id,deliveryId:deliveryId},successCallBack:function () {
                        that.$vux.toast.show({
                            text: '修改快递单号成功'
                        })
                    },failCallBack:function (data) {
                        that.$vux.toast.show({
                            type: 'text',
                            width:'11em',
                            text: '修改快递单号失败('+data.errorCode+')：'+data.errorDesc
                        })
                    } })

            }
        }
    }

</script>




<style lang="scss" scoped>
    .returnDetail-container{
        width: 100%;
        color: black;
        font-size: 15px;

        .head{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 365px;
            height: 40px;
            padding-left:10px;
            background-color: white;
            div{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-bottom: 1px solid #e5e5e5;
                height: 40px;
                width: 100%;
                /*font-size: 14px;*/
            }

        }

        .common{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 355px;
            height: 30px;
            padding: 0 10px;
            /*font-size: 14px;*/
            background-color: white;

        }

        .head-info{
            padding-bottom: 10px;
            background-color: white;
        }


        .process{
            width: 355px;
            padding: 8px 10px;
            text-align: left;
            margin-top: 20px;
            background-color: white;
            height: 70px;


        }


        #remain-space{
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            top: 8.6rem;
            background-color: white;


            .express-info{
                background-color: white;
                width: 100%;
                padding-top: 1px;


                .no-deliveryId{
                    .bottom-pane{
                        display: flex;
                        border-top: 1px solid #e5e5e5;
                        justify-content: center;
                        align-items: center;

                        div{
                            width: 187px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #808080;
                        }

                        .confirm{
                            border-left: 1px solid #e5e5e5;
                            color: #e4393c;
                        }


                    }
                }
                .express-input{
                    /*width: 375px;*/
                    height: 20px;
                    font-size: 15px;
                    /*border: 0;*/
                    /*outline: none;*/
                    /*text-align: center;*/
                    /*font-size: 14px;*/
                    /*border-top: 1px solid #e5e5e5;*/
                    /*border-bottom: 1px solid #e5e5e5;*/
                }

                .address{
                    width: 355px;
                    padding: 5px 10px;
                    text-align: left;
                    font-size: 14px;
                    color: #808080;
                }


                .delivery-div{

                    .delivery{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 16px;
                        width: 100%;
                        height: 40px;
                        color: #e4393c;
                        border-top: 1px solid #e5e5e5;
                        border-bottom: 1px solid #e5e5e5;
                    }




                    .delivery-slide {
                        z-index: 999;
                        padding-top: 0px;
                        overflow: hidden;
                        max-height: 0;
                        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
                        width: 100%;
                        /*padding: 0 20px;*/

                        .address{
                            padding-left: 20px;
                            padding-right: 20px;
                            width: 345px;
                        }


                        .bottom-pane{
                            display: flex;
                            border-top: 1px solid #e5e5e5;
                            justify-content: center;
                            align-items: center;
                            height: 45px;
                            width: 100%;

                            input::-ms-input-placeholder{
                                text-align: center;
                            }
                            input::-webkit-input-placeholder{
                                text-align: center;
                            }


                            .express-input{
                                /*width: 375px;*/
                                height: 20px;
                                font-size: 15px;
                                /*border-left: 1px solid #e5e5e5;*/
                                /*border-right: 1px solid #e5e5e5;*/
                                outline: none;
                                text-align:center;

                            }

                            .confirm{
                                display: flex;
                                color: #e4393c;
                                justify-content: center;
                                align-items: center;
                                width: 29%;
                                height: 100%;
                                border-left: 1px solid #e5e5e5;

                            }


                        }



                    }
                    .delivery-animate {
                        max-height: 100vh;
                        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
                        transition-delay: 0s;
                    }

                    .sub-item {
                        color: #888;
                    }
                }




            }

            .placeholder{
                width: 100%;
                height: 20px;
                background-color: #f2f2f2;
            }

            .process-detail{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 365px;
                height: 50px;
                padding-left:10px;
                background-color: white;
                /*margin-top: 20px;*/
                border-bottom: 1px solid #e5e5e5;

            }

            .process-info{
                width: 340px;
                background-color: white;
                font-size: 12px;
                text-align: left;
                padding:10px 15px 36px 20px;
                /*padding-bottom: 26px;*/
                flex: 1;

                .process-date{
                    margin-top: 8px;
                }

                .firsrtDate{
                    color: #808080;
                }

            }
        }





        .service{
            display: flex;
            height: 46px;
            width: 100%;
            justify-content: center;
            align-items: center;
            background-color: #f9f9f9;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 999;
            border-top: 1px solid #e5e5e5;

            img{
                height: 40%;
                width: auto;
                margin-right: 5px;
            }

        }




    }

</style>

<style lang="less" scoped>
    .vux-timeline{
        padding: 0 0;
    }
</style>
