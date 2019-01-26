<template>
    <!-- <div class="credit">
        <div class="content" ontouchstart="this.classList.toggle('click')">
            <div class="front">
                <div class="text" id="text">
                    <vue-count-up :start-value="start" :end-value="end" />
                </div>
                <img src="../assets/img/credit.png" alt="积分"/>
            </div>
            <div class="back">

            </div>
        </div>
    </div> -->
    <div class="credit" ref="credit" ontouchstart="this.classList.toggle('flip');">
        <div class="content">
            <div class="front">
                <div class="text" id="text">
                    <vue-count-up :start-value="start" :end-value="end" />
                </div>
                <img src="../assets/img/credit.png" alt="积分"/>
            </div>
            <div class="back">
                <div class="text"> beimian</div>
            </div>
        </div>
    </div>
</template>
<script>
import VueCountUp from 'vue-countupjs'
export default {
    components:{
        VueCountUp
    },
    data () {
        return {
            active: false,
            start: 0,
            end: 0
        }
    },
    created(){
        this.end = 5555;
    },
    methods:{
        fanzhuan(){
            console.log(this.$refs.credit);

        }
    }
}
</script>

<style lang="scss" scoped>
    $height: 230px;
    @keyframes action{
        0%{
            transform: rotateY(0)
        }
        25%{
            transform: rotateY(45deg)
        }
        50%{
            transform: rotateY(90deg)
        }
        75%{
            transform: rotateY(135deg)
        }
        100%{
            transform: rotateY(180deg)
        }
    }
    .credit{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        box-sizing: border-box;
        top: 36px;
        height: $height;
        line-height: $height;
        background-color: #fff;
        width: 100%;
        perspective: 1000;
        .content{
            position: relative;
            height: 210px;
            width: 325px;
            transition: 0.6s;
	        transform-style: preserve-3d;
            .text{
                position: absolute;
                color: #DEC678;
                font-size: 28px;
                font-style: italic;
                width: 100%;
            }
            img{
                height: 210px;
                width: 325px;
            }
            .back,.front{
                position: absolute;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                top: 0;
                left: 0;
                height: 210px;
                width: 325px;
                border-radius: 3px;
                background-color: #323436;
            }
        }
    }

	.credit.flip .content {
		transform: rotateY(180deg);
	}

    .front {
        z-index: 2;
    }

    .back {
        transform: rotateY(180deg);

    }
</style>

