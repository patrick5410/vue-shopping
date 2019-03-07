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

<style lang="less">
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




</style>
