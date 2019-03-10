<template>
    <div class="vux-step-item" :class=" { 'vux-step-item-with-tail' : !currentStepLast} ">
        <div class="title" style="height: 0.5rem;white-space :nowrap;" :class="'title-' + currentStatus">
            {{title}}
        </div>
        <div :class="'vux-step-item-tail ' + 'vux-step-item-tail-' + currentStatus" v-show="!currentStepLast" :style="{right: $parent.gutter}"></div>
        <!--<div :class="'vux-step-item-head ' + 'vux-step-item-head-' + currentStatus">-->
            <!--<div class="vux-step-item-head-inner" :class="{lastProcess: currentStepLast}" >-->
                <!--&lt;!&ndash;<span v-if="!icon && currentStatus!='finish'" class="vux-step-item-icon">{{currentStepNumber}}</span>&ndash;&gt;-->
                <!--&lt;!&ndash;<span v-else :class="'vux-step-item-icon ' + 'vux-step-item-' + iconName">&ndash;&gt;-->
        <!--&lt;!&ndash;<icon type="success_no_circle" class="vux-step-item-checked"></icon>&ndash;&gt;-->
      <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--</div>-->
        <!--</div>-->
        <!--<div :class="'vux-step-item-main ' + 'vux-step-item-main-' + currentStatus" :style="{backgroundColor: $parent.backgroundColor, paddingRight: currentStepLast ? 0 : $parent.gutter}">-->
            <!--<span class="vux-step-item-title">{{title}}</span>-->
            <!--<div class="vux-step-item-description">{{description}}</div>-->
        <!--</div>-->
        <div :class="'vux-step-item-head ' + 'vux-step-item-head-' + currentStatus">
            <svg v-if="!currentStepLast" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1">
                <circle  cx="0.19rem" cy="0.9rem" r="0.16rem" :stroke="currentStatus === 'finish' || currentStatus === 'process' ?'#d92b2b':'#ffe5e5'" stroke-width="0.0534rem" fill="#ffe5e5"/>
            </svg>

            <div v-else style="width: 1rem">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1">
                    <circle  cx="0.45rem" cy="0.9rem" r="0.4rem" :stroke="currentStatus === 'finish' || currentStatus === 'process' ?'#d92b2b':'#ffe5e5'" stroke-width="0.0534rem" fill="#ffe5e5"/>
                </svg>
            </div>

        </div>

    </div>

</template>

<script>
    import {Icon} from 'vux'
    export default {
        name: 'step-item',
        props: {
            title: String,
            description: String,
            stepNumber: Number,
            stepLast: Boolean,
            icon: String,
            status: String,
            tailWidth: Object
        },
        computed: {
            iconName () {
                return this.icon || 'check'
            }
        },
        created () {
            this.currentStatus = this.status
            this.currentStepLast = this.stepLast
            this.currentStepNumber = this.stepNumber
        },
        data () {
            return {
                currentStatus: '',
                currentStepLast: false,
                currentStepNumber: 0
            }
        },
        components: {
            Icon
        }
    }
</script>

<style lang="scss" scoped>
    .process{
        /*position: relative;*/
        /*height: 50px;*/
        /*width: 60px;*/

        .title{
            position: absolute;
            /*top:-20px;*/
            left: -10px;
            /*height: 20pxpx;*/
            /*z-index: 999;*/
            color: #808080
        }

        .title-process,.title-finish{
            color: black;
        }

        .lastProcess{
            width: 22px;
            height: 22px;
            margin-top: 2px;
        }
    }


    .vux-step-item {
        display: inline-block;
        position: relative;
        /*overflow: hidden;*/
        width: 50px;
    }
    .vux-step-item-with-tail {
        flex: 1;
    }
    .vux-step-item-tail {
        height: 3.2px;
        width: 100px;
        position: absolute;
        left: 8px;
        top: 43px;
        padding: 0 0;
        transition: all 0.4s ease 0s;
    }
    .vux-step-item-tail-finish {
        background: #d92b2b none repeat scroll 0 0;
    }
    .vux-step-item-tail-process, .vux-step-item-tail-wait {
        background: #ffe5e5 none repeat scroll 0 0;
    }
    .vux-step-item-icon {
        width: 20px;
        height: 22px;
        display: inline-block;
        text-align: center;
    }
    .vux-step-item-checked::before {
        font-size: 15px!important;
        line-height: 22px;
        margin: 0!important;
        transform: translateY(-4px);
    }
    .vux-step-item-title {
        font-size: 0.8rem;
    }
    .vux-step-item-head {
        position: relative;
        display: inline-block;
        margin-right: -4px;
        text-align: center;
        /*width: 50px;*/
        /*height: 60px;*/
        margin-top: 10px;

        .vux-step-item-head-inner {
            border: 2px solid #ffe5e5;
            margin: 8px auto;
            width: 8px;
            height: 8px;
            line-height: 22px;
            /*border-radius: 99px;*/
            text-align: center;
            font-size: 14px;
            border-radius: 999px;
            /*box-shadow: 0px 0px 1px #d92b2b;*/
            transition: all 0.4s ease 0s;
            background: #ffe5e5 none repeat scroll 0 0;
            background-clip: padding-box;
        }
    }
    .vux-step-item-head-finish .vux-step-item-head-inner{
        border: 2px solid #d92b2b;
        background-color: #ffe5e5;
        color: #09bb07;
        background-clip: padding-box;

    }
    .vux-step-item-head-process .vux-step-item-head-inner{
        border: 2px solid #d92b2b;
        color: #FFF;
        background: #ffe5e5 none repeat scroll 0 0;
        background-clip: padding-box;
    }
    .vux-step-item-head-wait .vux-step-item-head-inner {
        border: 2px solid #ffe5e5;
        color: #888;
        background-color: #ffe5e5;
        background-clip: padding-box;
    }
    .vux-step-item-main {
        display: inline-block;
        position: relative;
        vertical-align: top;
        color: #888;
        padding-left: 5px;
    }
    .vux-step-item-main-process {
        font-weight: bold;
        color: #666;
    }.vux-step-item {
         display: inline-block;
         position: relative;
         /*overflow: hidden;*/
         width: 50px;
     }
    .vux-step-item-with-tail {
        flex: 1;
    }
    .vux-step-item-tail {
        height: 3.2px;
        width: 100px;
        position: absolute;
        left: 8px;
        top: 43px;
        padding: 0 0;
        transition: all 0.4s ease 0s;
    }
    .vux-step-item-tail-finish {
        background: #d92b2b none repeat scroll 0 0;
    }
    .vux-step-item-tail-process, .vux-step-item-tail-wait {
        background: #ffe5e5 none repeat scroll 0 0;
    }
    .vux-step-item-icon {
        width: 20px;
        height: 22px;
        display: inline-block;
        text-align: center;
    }
    .vux-step-item-checked::before {
        font-size: 15px!important;
        line-height: 22px;
        margin: 0!important;
        transform: translateY(-4px);
    }
    .vux-step-item-title {
        font-size: 0.8rem;
    }
    .vux-step-item-head {
        position: relative;
        display: inline-block;
        margin-right: -4px;
        text-align: center;
        /*width: 50px;*/
        /*height: 60px;*/
        margin-top: 10px;

        .vux-step-item-head-inner {
            border: 2px solid #ffe5e5;
            margin: 8px auto;
            width: 8px;
            height: 8px;
            line-height: 22px;
            /*border-radius: 99px;*/
            text-align: center;
            font-size: 14px;
            border-radius: 999px;
            /*box-shadow: 0px 0px 1px #d92b2b;*/
            transition: all 0.4s ease 0s;
            background: #ffe5e5 none repeat scroll 0 0;
            background-clip: padding-box;
        }
    }
    .vux-step-item-head-finish .vux-step-item-head-inner{
        border: 2px solid #d92b2b;
        background-color: #ffe5e5;
        color: #09bb07;
        background-clip: padding-box;

    }
    .vux-step-item-head-process .vux-step-item-head-inner{
        border: 2px solid #d92b2b;
        color: #FFF;
        background: #ffe5e5 none repeat scroll 0 0;
        background-clip: padding-box;
    }
    .vux-step-item-head-wait .vux-step-item-head-inner {
        border: 2px solid #ffe5e5;
        color: #888;
        background-color: #ffe5e5;
        background-clip: padding-box;
    }
    .vux-step-item-main {
        display: inline-block;
        position: relative;
        vertical-align: top;
        color: #888;
        padding-left: 5px;
    }
    .vux-step-item-main-process {
        font-weight: bold;
        color: #666;
    }


</style>
