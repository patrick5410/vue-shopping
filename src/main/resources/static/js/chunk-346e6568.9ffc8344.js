(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-346e6568"],{"0a0d2":function(n,e,i){"use strict";i.r(e);var t=i("fb62"),o=i("7ea2"),a=i("862b"),r=i("8fba"),s=i("81b6"),l=i("3c52"),d=(t["a"],o["a"],a["a"],s["a"],l["a"],r["a"],{name:"index",components:{Menu:t["a"],Header:o["a"],Credit:a["a"],Divider:s["a"],Scroller:l["a"],RemainSpace:r["a"]},data:function(){return{creditSort:425,recommendClass:"车载配件",recommendClassUrl:"/showMore",recommendImgUrl:"/img/banner.png",loading:!1,isFinish:!1,goods:[],num:4}},mounted:function(){this.$nextTick(function(){this.loadMore()})},beforeDestroy:function(){},methods:{toRecommendClass:function(){this.$router.push({name:"showMore",query:{clzName:this.recommendClass}})},loadMore:function(){var n=this,e=this;e.isFinish||this.loading||(this.loading=!0,setTimeout(function(){n.goods[n.goods.length-1];for(var i=1;i<=9;i++)i%3==0?n.goods.push({id:e.num++,name:"车载配件"+i,originalPrice:1108,price:1058,img:"/img/good/"+i+".jpg"}):i%3==1?n.goods.push({id:e.num++,name:"车载配件"+i,originalPrice:1304,price:1058,img:"/img/good/"+i+".jpg"}):n.goods.push({id:e.num++,name:"车载配件"+i,originalPrice:1406,price:1058,img:"/img/good/"+i+".jpg"});n.loading=!1,n.num>50&&(e.isFinish=!0)},2e3))},goodDetail:function(n){this.$router.push({name:"good",query:{goodId:n}})}}}),c=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"index"},[i("Header"),n._v(" "),i("RemainSpace",[i("scroller",{staticClass:"scroller-container",attrs:{"lock-x":"","scroll-bottom-offset":0,height:"100%"},on:{"on-scroll-bottom":n.loadMore}},[i("div",{staticClass:"container"},[i("Credit"),n._v(" "),i("div",{staticClass:"recommend-good"},[i("div",{staticClass:"re-class"},[i("div",{staticClass:"re-className"},[n._v(n._s(n.recommendClass))]),n._v(" "),i("div",{staticClass:"re-more",on:{click:n.toRecommendClass}},[n._v("更多")])]),n._v(" "),i("img",{staticClass:"re-classImg",attrs:{src:n.recommendImgUrl}})]),n._v(" "),i("div",{staticClass:"goods-container"},[i("div",{staticClass:"goods"},[n._l(n.goods,function(e,t){return i("div",{key:e.id,staticClass:"good",on:{click:function(i){n.goodDetail(e.id)}}},[i("div",{staticClass:"good-img"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img,expression:"item.img"}],ref:"itemImg",refInFor:!0,staticStyle:{width:"100%",height:"auto"}}),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.originalPrice>e.price,expression:"item.originalPrice>item.price"}],staticStyle:{position:"absolute",left:"0",bottom:"0"}},[i("span",{staticClass:"cutPrice",style:e.originalPrice-e.price>100?e.originalPrice-e.price>300?"background-color:#995454":"background-color:#ffbf80":"background-color:#52992e"},[n._v(" 直降"+n._s(e.originalPrice-e.price)+"元 ")])])]),n._v(" "),i("div",{staticClass:"good-bottom"},[i("div",[n._v(n._s(e.name))]),n._v(" "),i("div",{staticStyle:{color:"#995454"}},[n._v("¥"+n._s(e.price))])])])}),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:n.loading,expression:"loading"}],staticClass:"loading"},[i("img",{staticClass:"loading-img",attrs:{src:"/img/loading.gif"}}),n._v("\n              加载中...\n            ")]),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:n.isFinish,expression:"isFinish"}],staticClass:"bottom-line"},[i("divider",[n._v("我是有底线滴")])],1)],2)])],1)])],1),n._v(" "),i("Menu")],1)},m=[],g=i("2455");function b(n){i("cd22")}var u=!1,p=b,h="data-v-b6e0b398",f=null,v=Object(g["a"])(d,c,m,u,p,h,f);e["default"]=v.exports},"0bfb":function(n,e,i){"use strict";var t=i("cb7c");n.exports=function(){var n=t(this),e="";return n.global&&(e+="g"),n.ignoreCase&&(e+="i"),n.multiline&&(e+="m"),n.unicode&&(e+="u"),n.sticky&&(e+="y"),e}},"420e":function(n,e,i){e=n.exports=i("2350")(!1),e.push([n.i,'\n@charset "UTF-8";\n.container[data-v-b6e0b398] {\n  width: 10rem;\n  /*height: 230px;*/\n  background-color: white;\n  /*margin-top: 36px;*/\n  /*margin-bottom: 65px;*/\n}\n\n/*推荐商品*/\n.recommend-good[data-v-b6e0b398] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 3.2rem;\n  background-color: white;\n  position: relative;\n}\n.re-class[data-v-b6e0b398] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 9.466667rem;\n  margin: 0.133333rem 0.266667rem;\n  height: 0.533333rem;\n  position: relative;\n  /*justify-content: center;*/\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.re-className[data-v-b6e0b398] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 0.426667rem;\n}\n.re-more[data-v-b6e0b398] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: absolute;\n  /*justify-content: center;*/\n  -webkit-box-align: baseline;\n  -ms-flex-align: baseline;\n  align-items: baseline;\n  width: 1.333333rem;\n  right: 0;\n  color: #808080;\n  background-image: url("/img/箭头.png");\n  background-size: 0.453333rem 0.453333rem;\n  background-position: right;\n  background-repeat: no-repeat;\n  font-size: 0.373333rem;\n}\n.re-classImg[data-v-b6e0b398] {\n  width: 9.466667rem;\n  height: 2.133333rem;\n  position: absolute;\n  top: 0.8rem;\n  left: 0.266667rem;\n}\n\n/*商品列表*/\n.goods-container[data-v-b6e0b398] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 10rem;\n  background-color: white;\n  /*padding-bottom: 60px;*/\n  /*border: 1px solid blue;*/\n}\n.goods[data-v-b6e0b398] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 9.466667rem;\n  margin: 0 auto;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n.good[data-v-b6e0b398] {\n  width: 2.933333rem;\n  height: 4rem;\n  margin: 0.133333rem 0;\n  /*text-align: left;*/\n  /*background-color: blue;*/\n  /*border: 1px solid blue;*/\n}\n.good-img[data-v-b6e0b398] {\n  width: 2.933333rem;\n  height: 2.933333rem;\n  overflow: hidden;\n  position: relative;\n  /*background-color: #f2f2f2;*/\n  background: rgba(0, 0, 0, 0.02);\n}\n.good-bottom[data-v-b6e0b398] {\n  display: block;\n  width: 100%;\n  text-align: left;\n}\n.good-bottom > div[data-v-b6e0b398] {\n  width: 2.933333rem;\n}\n.cutPrice[data-v-b6e0b398] {\n  /*display: flex;*/\n  /*width: 50px;*/\n  /*height: 12px;*/\n  /*position: absolute;*/\n  /*bottom: 0;*/\n  /*left: 0;*/\n  /*background-color: #52992e;*/\n  /*color: white;*/\n  /*justify-content: center;*/\n  /*align-items: baseline;*/\n  /*font-size: 10px;*/\n  /*border-radius: 1px;*/\n  color: white;\n  /*justify-content: center;*/\n  /*align-items: center;*/\n  font-size: 0.32rem;\n  border-radius: 0.026667rem;\n}\n.loading[data-v-b6e0b398] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  width: 100%;\n  font-size: 0.4rem;\n  margin: 0.266667rem auto;\n}\n.loading-img[data-v-b6e0b398] {\n  height: 0.586667rem;\n  width: 0.586667rem;\n  margin-right: 0.266667rem;\n}\n.bottom-line[data-v-b6e0b398] {\n  width: 100%;\n  margin: 0.266667rem;\n}\n.scroller-container[data-v-b6e0b398] {\n  /*height :10px;*/\n  margin-top: 0.96rem;\n  width: 100%;\n  /*height: 600px;*/\n  /*border: 1px solid yellow;*/\n  background-color: white;\n}',""])},"8fba":function(n,e,i){"use strict";var t={data:function(){return{remainHeight:100}},mounted:function(){this.$nextTick(function(){this.remainHeight=window.innerHeight-window.document.getElementById("header").clientHeight-window.document.getElementById("menu").clientHeight})}},o=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"order-container",style:{height:n.remainHeight+"px"}},[n._t("default")],2)},a=[],r=i("2455"),s=!1,l=null,d=null,c=null,m=Object(r["a"])(t,o,a,s,l,d,c);e["a"]=m.exports},cd22:function(n,e,i){var t=i("420e");"string"===typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);var o=i("499e").default;o("2b6ba177",t,!0,{})}}]);
//# sourceMappingURL=chunk-346e6568.9ffc8344.js.map