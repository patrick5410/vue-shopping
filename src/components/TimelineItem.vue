<template>
    <li class="vux-timeline-item">
        <div :class="['vux-timeline-item-color', 'vux-timeline-item-head-first']" :style="headStyle">
            <!--<icon v-show="isFirst && $parent.isShowIcon" type="success_no_circle" class="vux-timeline-item-checked"></icon>-->
            <!--<div class="img-div">-->
                <!--<img v-if="isFirst" src="../assets/img/right1.png">-->
                <!--<img v-else src="../assets/img/right2.png">-->
            <!--</div>-->

            <div v-if="isFirst" class="first-img-div" >
                <img src="../assets/img/right1.png">
            </div>
            <div v-else class="img-div" >
                <img src="../assets/img/right2.png">
            </div>


        </div>
        <div class="vux-timeline-item-tail" :style="tailStyle"></div>
        <div class="vux-timeline-item-content" style="font-size: 0.4rem;padding-bottom: 0.8rem;padding-left: 0.8rem;padding-top: 0.1rem" :style="itemContent">
            <slot></slot>
        </div>
    </li>
</template>

<script>
    import {Icon} from 'vux'
    export default {
        name: 'timeline-item',
        data () {
            return {
                isLast: true,
                isFirst: true,
                headStyle: { backgroundColor: this.$parent.color }
            }
        },
        mounted () {
            this.$parent.setChildProps()
        },
        beforeDestroy () {
            // this will be null
            const $parent = this.$parent
            this.$nextTick(() => {
                $parent.setChildProps()
            })
        },
        components: {
            Icon
        },
        computed: {
            tailStyle () {
                return this.isLast ? { display: 'none', backgroundColor: '#808080' } : { display: 'block', backgroundColor: '#808080' }
            },
            itemContent(){
                return this.isFirst ? {color:'#000'}:{color:'#808080'}
            }
        }
    }
</script>

<style lang="less" scoped>
    .vux-timeline-item{

        .img-div{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            background-color: white;

            img{
                width: 100%;
                height: 100%;
            }
        }

        .first-img-div{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 23px;
            height: 23px;
            background-color: white;

            img{
                width: 100%;
                height: 100%;
            }

        }


    }
</style>
