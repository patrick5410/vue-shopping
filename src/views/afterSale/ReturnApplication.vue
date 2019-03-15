<!--申请退货-->
<template>
  <div class="return-application">
    <div class="head">退货书籍</div>

    <div class="good-one-right">
      <div class="good-img" @click="goodDetail($store.state.returnGood.goodId)">
        <img :src="$store.state.returnGood.goodImg" style="width: 100%;height: auto">
      </div>
      <div class="good-info">
        <div class="goodName">
          <div  @click="goodDetail($store.state.returnGood.goodId)">{{$store.state.returnGood.goodName}}</div>
        </div>
        <div class="specification">{{$store.state.returnGood.goodSpecificationItems}}</div>
        <div class="count-div">
          <div class="buyCount">
            <div class="buyCount-cut" @click="cutCount($store.state.returnGood)">-</div>
            <input class="buyCount-input" type="number" v-model="$store.state.returnGood.returnCount" @blur="changeCount($store.state.returnGood)"></input>
            <div class="buyCount-add" @click="addCount($store.state.returnGood)">+</div>
          </div>
          <div class="count-tip">该书籍可退{{$store.state.returnGood.buyCount}}件</div>
        </div>
      </div>
    </div>
    <div class="good-common">
      <div>退货原因</div>
      <div style="color: #808080" @click="showSelect=true">
        <div class="return-reason" v-if="$store.state.returnGood.reason">
          {{$store.state.returnGood.reason}}<img src="../../assets/img/forward_right.png">
        </div>
        <div class="return-reason" v-else>
          请选择<img src="../../assets/img/forward_right.png">
        </div>
      </div>
    </div>
    <actionsheet v-model="showSelect" :menus="$store.state.returnGood.reasons" show-cancel @on-click-menu="selectReason"></actionsheet>

    <div class="good-common">
      <div>退款金额：<span style="color: #995454">¥{{($store.state.returnGood.goodPrice*$store.state.returnGood.returnCount).toFixed(2)}}</span></div>
    </div>

    <div class="good-common">
      <div>退货说明：</div>
      <div>
        <input  class="leave-word" v-model="$store.state.returnGood.remark"  type="text" maxlength="20"  placeholder="选填，如是其他退货原因，请在这里填写">
      </div>
    </div>

    <div class="return-img-container">
      <div class="return-img-head">上传图片</div>
      <div class="return-img">
        <div class="one-img" v-for="item in $store.state.returnGood.returnImgs">
          <img :src="item.img" @click="item.show = true">
          <div v-transfer-dom>
            <x-dialog v-model="item.show">
              <div class="img-box" style="margin-top: 0.5rem">
                <img :src="item.img" style="width:70%;height: auto">
              </div>
              <div  @click.stop="item.show=false" class="close-cancel">
                <icon type="cancel" style="font-size: 0.8rem"></icon>
              </div>
            </x-dialog>
          </div>
          <div class="delete" @click.stop="del(item)">
            <icon type="clear" style="font-size: 0.45rem"></icon>
          </div>
        </div>
        <div class="return-img-div" v-if="$store.state.returnGood.returnImgs && $store.state.returnGood.returnImgs.length<4">
          <div>
            <div class="img-add">+</div>
            <div>添加图片</div>
          </div>
          <input type="file" class="file" @change="uploadImg($event, 1)" style="z-index: 999" ref="fileClear" accept="image/png, image/jpeg, image/gif, image/jpg"/>
        </div>
        <div v-transfer-dom>
          <x-dialog v-model="showCrop" id="dialog-demo">
            <div style="width: 100%;height: 100vw;">
              <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="option.info"
                :centerBox=true
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :fixed=option.fixed
                :fixedNumber=option.fixedNumber
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :fixedBox="option.fixedBox"
              ></vueCropper>
            </div>
            <div style="display: flex;justify-content: space-between">
              <div style="background-color: #cccccc;color: #fff;font-size: 0.45rem;width: 50%;height: 1.2rem;line-height: 1.2rem;" @click="cancel">取消</div>
              <div style="background-color: #e4393c;color: #fff;font-size: 0.45rem;width: 50%;height: 1.2rem;line-height: 1.2rem;" @click="upload">开始上传</div>
            </div>
          </x-dialog>
        </div>
      </div>
      <div class="return-img-bottom">可上传4张图片</div>
    </div>
    <div  class="returnApplication" @click="returnApplication">
      {{$store.state.returnGood.returnGoodId?'重新提交':'提交申请'}}
    </div>
  </div>
</template>

<script>
  import { Icon } from 'vux'
  import { XDialog,TransferDomDirective as TransferDom } from 'vux'
  import { VueCropper }  from 'vue-cropper'
  import  { ToastPlugin} from 'vux'
  import  { LoadingPlugin } from 'vux'
  import { Actionsheet } from 'vux'
  import  { AlertPlugin } from 'vux'
  import Vue from 'vue'

  Vue.use(AlertPlugin)
  Vue.use(LoadingPlugin)
  Vue.use(ToastPlugin)

  export default {
    directives: {
      TransferDom
    },
    components: {
      Icon,
      XDialog,
      VueCropper,
      Actionsheet
    },
    data: function () {
      return {

        showCrop:false,
        selectFile:'',
        showSelect:false,

        //剪切图片上传
        crap: false,
        previews: {},
        option: {
          img: '',
          outputSize:1, //剪切后的图片质量（0.1-1）
          full: false,//输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: window.innerWidth,
          autoCropHeight: window.innerWidth*2,
          fixedBox: true,
          canScale: true,
          info: true,
          fixed:true,//开启宽高固定比例
          fixedNumber:[375,667]//宽高固定比例
        },
        fileName:'',  //本机文件地址
        downImg: '#',
        imgFile:'',
        uploadImgRelaPath:'', //上传后的图片的地址（不带服务器域名）

      }
    },
    created(){
      this.item = this.$store.state.returnGood
      console.log("退货信息item",this.item)
    },
    methods:{
      /**
       * 删除上传的照片
       * @param item
       */
      del(item){
        console.log('删除上传图片：',item)
        let index = this.$store.state.returnGood.returnImgs.indexOf(item)
        if (index > -1) {
          this.$store.state.returnGood.returnImgs.splice(index, 1);
        }
      },
      //书籍详情页面
      goodDetail(goodId){
        this.$router.push({name:'good',query:{goodId:goodId}})
      },
      addCount(item){
        item.returnCount<item.buyCount?item.returnCount++:item.returnCount
      },
      cutCount(item){
        item.returnCount>1?item.returnCount--:1
      },
      changeCount(item){
        console.log("item",item)
        if (!item.returnCount || item.returnCount == '' || item.returnCount<1){
          item.returnCount = 1
        }
        if(item.returnCount>item.buyCount){
          item.returnCount = item.buyCount
        }

      },
      /**
       * 提交申请
       */
      returnApplication(){
      // |afterSaleId      |Y       |Integer   |售后中心id |
      //   |returnCount      |Y       |Integer   |退货数量 |
      //   |reason      |Y       |String   |退货原因 |
      //   |remark      |Y       |String   |退货说明 |
      //   |returnImgs      |Y       |Array   |退货上传照片 |
        console.log("申请退货中")
        if(!this.$store.state.returnGood.reason){
          this.$vux.alert.show({
            title: '退货申请提示',
            content: '请先选择退货原因'
          })
          return
        }

        if(this.$store.state.returnGood.reason ==="其他" && !this.$store.state.returnGood.remark){
          this.$vux.alert.show({
            title: '退货申请提示',
            content: '请先在退货说明输入退货原因'
          })
          return
        }

        if(this.$store.state.returnGood.returnImgs && this.$store.state.returnGood.returnImgs.length<1){
          this.$vux.alert.show({
            title: '退货申请提示',
            content: '请至少上传一张书籍相关图片'
          })
          return
        }

        let that = this
        that.$vux.loading.show({
          text: '退货申请中'
        })

        let returnImgs = []
        for (let i = 0; i < this.$store.state.returnGood.returnImgs.length; i++) {
          returnImgs.push(this.$store.state.returnGood.returnImgs[i].img)
        }
        let data ={
          afterSaleId:this.$store.state.returnGood.afterSaleId,
          returnCount:this.$store.state.returnGood.returnCount,
          reason:this.$store.state.returnGood.reason,
          remark:this.$store.state.returnGood.remark,
          returnImgs:returnImgs
        }


        this.$store.commit('returnApplication', { data: data,successCallBack:function (data) {
            //关闭加载框
            that.$vux.loading.hide()
            that.$vux.alert.show({
              title: '退货申请成功',
              content: '您的申请已提交,很抱歉给您带来不便'
            })
            //跳转到退货详情
            that.$router.push({name:'returnDetail',query:{afterSaleId:that.$store.state.returnGood.afterSaleId}})

          },failCallBack:function (data) {
            //关闭加载框
            that.$vux.loading.hide()
            that.$vux.toast.show({
              type: 'warn',
              width:'11em',
              text: '退货申请失败('+data.errorCode+')：'+data.errorDesc
            })
          } })

      },
      cropPicture(e){
        //弹出截图框
        this.showCrop = true
        console.log("弹出截图框======",e.target.files)
        this.selectFile = e.target.files[0]

      },
      uploadImg(e, num) {
        //读取手机图片
        this.showCrop = true
        console.log('uploadImg');
        var _this = this;
        //上传图片
        var file = e.target.files[0]
        _this.fileName = file.name;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        console.log('uploadImg2',file);
        var reader = new FileReader();
        reader.onload =(e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          }
          else {
            data = e.target.result
          }
          console.log("num",num)
          _this.option.img = data

        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);

      },
      cancel(){
        //取消截图
        this.showCrop = false
        this.$refs.fileClear.value = ''
      },
      upload(){
        //上传截图
        let that = this
        console.log("开始上传图片")
        that.$vux.loading.show({
          text: '图片上传中'
        })
        this.$refs.cropper.getCropBlob((data) => {
          // do something
          console.log(data)
          var fd = new FormData();
          fd.append("file",data,'returnApplication.png');
          fd.append("userName",'shopping');
          fd.append("fileType",'11');
          console.log("FormData",fd);
          $.ajax({
            url:"http://61.145.69.198:8222/api/upload/",
            type:"post",
            data:fd,
            processData:false,  //tell jQuery not to process the data
            contentType: false,  //tell jQuery not to set contentType
            success:function (data) {
              console.log(data);
              console.log(data.fileUrl);
              //添加到图片对象
              that.$store.state.returnGood.returnImgs.push({
                img:data.data.fileUrl,
                show:false
              })

              console.log("图片对象",that.images)
              //关闭截图弹框
              that.cancel()

              //关闭加载框
              that.$vux.loading.hide()

            },
            fail:function (data) {
              that.$vux.toast.show({
                type: 'warn',
                width:'11em',
                text: '上传图片失败：'+data.error
              })
            }

          })


        })
      },
      selectReason(key, item){
        //选择退货原因
        console.log(key, item)
        if(item){
          this.$store.state.returnGood.reason = item
        }
      }



    }
  }
</script>



<style lang="scss" scoped>
  .return-application{
    width: 100%;
    font-size: 14px;
    border-bottom-width: 1px;

    .head{
      width: 355px;
      height: 30px;
      padding: 0 10px;
      background-color: white;
      display: flex;
      justify-content: left;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;

    }

    .good-one-right{
      /*display: flex;*/
      /*margin: auto 0;*/
      width: 355px;
      height: 110px;
      padding: 0 10px;
      text-align: left;
      font-size: 15px;
      position: relative;
      background-color: white;
      .good-img{
        position: relative;
        /*bottom: 20px;*/
        display: inline-block;
        width: 80px;
        height: 80px;
        background-color: #f2f2f2;
      }

      .good-info{
        display: inline-block;
        position: absolute;
        top: 0;
        margin-left: 20px;
        font-size: 14px;
        .goodName{
          /*margin: 5px 0;*/
          width: 200px;
          display: flex;
          justify-content: space-between;
          color: black;
        }

        .goodPrice{
          /*margin: 13px auto;*/
          color: #995454;
        }

        .specification{
          margin: 12px 0;
          color: #808080;
          font-size: 13px;
        }

        .count-div{
          display: flex;
          justify-content: space-between;
          width: 100%;
          position: relative;

          .buyCount{
          position: absolute;
          width: 84px;
          height: 18px;
          line-height: 18px;

          .buyCount-input{
            display: inline-block;
            position: absolute;
            line-height: 18px;
            top: 0;
            left: 21px;
            width: 40px;
            height: 100%;
            border: 1px solid #e5e5e5;
            font-size: 13px;
            text-align: center;
            outline:none;
          }



          .buyCount-cut,.buyCount-add{
            width: 20px;
            height: 100%;
            line-height: 18px;
            text-align: center;
            display: inline-block;
            border: 1px solid #e5e5e5;
          }

          .buyCount-cut{
            position: absolute;
            top: 0;
            left: 0;
          }

          .buyCount-add{
            position: absolute;
            top: 0;
            right: 0;

          }


        }

          .count-tip{
            position: absolute;
            right: 0;
            top: 0;
            color: #808080;
          }
        }





      }


      .good-sore{
        position: absolute;
        bottom: 5px;
        /*color: black;*/
        font-size: 13px;
        color: #808080;
        width: 100%;
      }

    }

    .good-common{
      display: flex;
      height: 40px;
      width: 355px;
      padding: 0 10px;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      margin-top: 10px;
      /*border-bottom: 1px solid #e5e5e5;*/
      div:first-child{
        /*color: #808080;*/
      }

      .return-reason{
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        img{
          height: 14px;
          width: auto;
          margin-left: 5px;
        }

      }



      .leave-word{
        width: 280px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        vertical-align:middle;
        outline: none;
        border: 0;
        margin: auto 0;
      }


    }


    .return-img-container{
      background-color: white;
      margin-top: 10px;
      margin-bottom: 46px;

      .return-img-head,.return-img-bottom{
        width: 355px;
        padding: 0 10px;
        display: flex;
        align-items: center;

      }

      .return-img-head{
        height: 30px;
      }

      .return-img{
        display: flex;
        justify-content: flex-start;
        width: 100%;

        >div{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 73.75px;
          width: 73.75px;
          margin: 0 10px;
          border-radius: 5px;
        }

        .one-img{
          position: relative;

          img{
            width: 100%;
            height: 100%;
          }

          .delete{
            width: 20px;
            height: 20px;
            position: absolute;
            top: -7px;
            right: -7px;
          }




        }

        .return-img-div{
          background-color: #e5e5e5;
          color: #808080;
          position: relative;

          .img-add{
            width: 100%;
            height: 16px;
            font-size: 26px;
            line-height: 10px;
          }

          .file{
            height: 73.75px;
            width: 73.75px;
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0

          }
        }



      }




      .return-img-bottom{
        margin-top: 5px;
        height: 20px;
        font-size: 12px;
        color: #808080;
      }


    }

    .returnApplication{
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



