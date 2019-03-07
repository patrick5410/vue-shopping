<template>
  <div class="vux-step">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'step',
    props: {
      value: Number,
      backgroundColor: {
        type: String,
        default: '#fff'
      },
      gutter: {
        type: String,
        default: '10px'
      }
    },
    created () {
      this.current = this.value
    },
    mounted () {
      this._mapPropsToChildComponent()
    },
    watch: {
      value (val) {
        this.current = val
      },
      current (val) {
        this._mapPropsToChildComponent()
        this.$emit('input', val)
      }
    },
    data () {
      return {
        current: 0
      }
    },
    methods: {
      _mapPropsToChildComponent () {
        const _this = this
        const len = this.$children.length - 1
        this.$children.forEach((child, index) => {
          child.currentStepNumber = (index + 1).toString()
          child.currentStepLast = index === len
          if (index === _this.current) {
            child.currentStatus = 'process'
          } else if (index < _this.current) {
            child.currentStatus = 'finish'
          } else {
            child.currentStatus = 'wait'
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .vux-step {
    display: flex;
    position: relative;
    left: 10px;
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
    width: 80px;
    position: absolute;
    left: 10px;
    top: 33px;
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
    margin-top: 20px;

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
