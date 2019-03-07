<!--退货进度详情-->
<template>
    <div class="returnDetail-container">
        <div class="head">
            <div>
                <img src="../../assets/img/return_info.png" style="width:.6rem;margin-right: .2rem"/>退货信息
            </div>
        </div>
        <div class="head-info">
            <div class="common">
                <div>服务单号</div>
                <div>100015</div>
            </div>
            <div class="common">
                <div>申请时间</div>
                <div>2019-03-06 15:59:15</div>
            </div>
            <div class="common">
                <div>退款金额</div>
                <div>¥128.00</div>
            </div>
            <div class="common">
                <div>退回微信(陈健)</div>
                <div style="color: #995454">¥128.00</div>
            </div>
        </div>


        <div class="process">

            <Step v-model="step2" background-color='#fbf9fe'>
                <StepItem title="待审核"></StepItem>
                <StepItem title="已审核"></StepItem>
                <StepItem title="已寄回"></StepItem>
                <StepItem title="退款中"></StepItem>
                <StepItem title="已完成"></StepItem>
            </Step>

            <div>
                <!--<cell :title=""-->
                        <!--is-link-->
                        <!--:border-intent="false"-->
                        <!--:arrow-direction="showContent004 ? 'up' : 'down'"-->
                        <!--@click.native="showContent004 = !showContent004"></cell>-->

                <!--<p class="slide" :class="showContent004?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>-->
            </div>
        </div>

        <div class="process-detail">
            <img src="../../assets/img/process.png" style="width:.6rem;margin-right: .2rem"/>处理进度
        </div>
        <div class="process-info">
            <timeline>
                <timeline-item>
                    <div>你的服务订单已成功退款，请及时查收</div>
                    <div class="process-date firsrt-date" >2016-04-17 12:00:00</div>
                </timeline-item>
                <timeline-item>
                    <div>货物核验完成，等待退款</div>
                    <div class="process-date" >2016-04-17 12:00:00</div>
                </timeline-item>
                <timeline-item>
                    <div>您的货物已寄回仓库，正在核验货物</div>
                    <div class="process-date">2016-04-16 10:23:00</div>
                </timeline-item>
                <timeline-item>
                    <div>您的服务单已完成审核，请填写寄回快递单号</div>
                    <div class="process-date">2016-04-15 9:00:00</div>
                </timeline-item>
                <timeline-item>
                    <div>您的服务单申请成功，等待审核中</div>
                    <div class="process-date">2016-04-15 9:00:00</div>
                </timeline-item>
            </timeline>
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

    // import { Timeline, TimelineItem } from 'vux'

    export default {

        components: {
            Step,
            StepItem,
            Timeline,
            TimelineItem
        },
        data () {
            return {
                step2:2
            }
        },
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

        .process-detail{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 365px;
            height: 50px;
            padding-left:10px;
            background-color: white;
            margin-top: 20px;
            border-bottom: 1px solid #e5e5e5;

        }

        .process-info{
            width: 355px;
            background-color: white;
            font-size: 12px;
            text-align: left;
            padding-bottom: 36px;
            padding-left:10px;

            .process-date{
                margin-top: 8px;
            }

            .firsrt-date{
                color: #808080;
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

            img{
                height: 40%;
                width: auto;
                margin-right: 5px;
            }

        }
    }

</style>

<style lang="less">
    .vux-timeline{
        padding: 0 0;
    }
</style>
