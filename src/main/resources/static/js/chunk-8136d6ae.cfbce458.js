(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8136d6ae"],{"0bfb":function(e,t,n){"use strict";var r=n("cb7c");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,n){"use strict";n("b0c5");var r=n("2aba"),a=n("32e9"),i=n("79e5"),o=n("be13"),c=n("2b4c"),s=n("520a"),l=c("species"),u=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),h=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var d=c(e),f=!i(function(){var t={};return t[d]=function(){return 7},7!=""[e](t)}),p=f?!i(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[l]=function(){return n}),n[d](""),!t}):void 0;if(!f||!p||"replace"===e&&!u||"split"===e&&!h){var g=/./[d],x=n(o,d,""[e],function(e,t,n,r,a){return t.exec===s?f&&!a?{done:!0,value:g.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),m=x[0],y=x[1];r(String.prototype,e,m),a(RegExp.prototype,d,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}}},"26ab":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,'\n@charset "UTF-8";\n.header[data-v-7169fa56] {\n  position: fixed;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  top: 0;\n  height: 0.96rem;\n  width: 100%;\n  background-color: white;\n  border-bottom: #e5e5e5 0.026667rem solid;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  z-index: 100;\n}\n.header input[data-v-7169fa56] {\n  height: 0.746667rem;\n  width: 8.8rem;\n  font-size: 0.32rem;\n  background-color: #e5e5e5;\n  background-image: url("/img/search.png");\n  background-repeat: no-repeat;\n  background-size: 0.426667rem 0.426667rem;\n  background-position-x: 0.133333rem;\n  background-position-y: center;\n  border-radius: 0.08rem;\n  outline: none;\n  border: 0;\n  padding-left: 0.666667rem;\n}\n.header .searchInput[data-v-7169fa56] {\n  width: 7.2rem;\n  /*搜索按钮*/\n}\n.header .searchInput + div[data-v-7169fa56] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.header .search[data-v-7169fa56] {\n  display: none;\n  margin-left: 0.266667rem;\n  width: 1.333333rem;\n  height: 0.746667rem;\n  background-color: #995454;\n  color: white;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  font-size: 0.32rem;\n  border-radius: 0.026667rem;\n}',""])},"386d":function(e,t,n){"use strict";var r=n("cb7c"),a=n("83a1"),i=n("5f1b");n("214f")("search",1,function(e,t,n,o){return[function(n){var r=e(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,r):new RegExp(n)[t](String(r))},function(e){var t=o(n,e,this);if(t.done)return t.value;var c=r(e),s=String(this),l=c.lastIndex;a(l,0)||(c.lastIndex=0);var u=i(c,s);return a(c.lastIndex,l)||(c.lastIndex=l),null===u?-1:u.index}]})},"520a":function(e,t,n){"use strict";var r=n("0bfb"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,c="lastIndex",s=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e[c]||0!==t[c]}(),l=void 0!==/()??/.exec("")[1],u=s||l;u&&(o=function(e){var t,n,o,u,h=this;return l&&(n=new RegExp("^"+h.source+"$(?!\\s)",r.call(h))),s&&(t=h[c]),o=a.call(h,e),s&&o&&(h[c]=h.global?o.index+o[0].length:t),l&&o&&o.length>1&&i.call(o[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)}),o}),e.exports=o},"5f1b":function(e,t,n){"use strict";var r=n("23c6"),a=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"617a":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,"\n.search-container[data-v-45a84469] {\n  width: 100%;\n  height: 100vh;\n  background-color: white;\n}\n.search-container .history-search[data-v-45a84469] {\n  padding-top: 1.2rem;\n}\n.search-container .history-search .history-search-head[data-v-45a84469] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 0.8rem;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.search-container .history-search .history-search-head div[data-v-45a84469] {\n  margin: 0 0.266667rem;\n}\n.search-container .history-search .history-search-content[data-v-45a84469] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -ms-flex-flow: wrap;\n  flex-flow: wrap;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -ms-flex-line-pack: start;\n  align-content: flex-start;\n  height: 8rem;\n  padding: 0 0.266667rem;\n}\n.search-container .history-search .history-search-content div[data-v-45a84469] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  /*width: 50px;*/\n  height: 0.8rem;\n  background-color: #e6e6e6;\n  margin: 0.133333rem 0.16rem;\n  border-radius: 0.053333rem;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  color: #666666;\n  padding: 0 0.266667rem;\n}",""])},"794be":function(e,t,n){"use strict";n.r(t);n("386d");var r=n("7ea2"),a=n("8fba"),i=(r["a"],a["a"],{components:{Header:r["a"],RemainSpace:a["a"]},data:function(){return{historySearch:[],containerHeight:window.innerHeight}},created:function(){},computed:{},watch:{},mounted:function(){var e=this;this.$nextTick(function(){-1!==e.$route.path.indexOf("search")&&e.$refs.header.$refs["searchInput"].focus();try{e.historySearch=[],localStorage.getItem("historySearch")&&(e.historySearch=JSON.parse(localStorage.getItem("historySearch")))}catch(r){console.log("出现异常",r),localStorage.removeItem("historySearch")}var t=e.$refs.header.search,n=e;e.$refs.header.search=function(){t(),n.historySearch=JSON.parse(localStorage.getItem("historySearch"))}})},methods:{clearHistorySearch:function(){localStorage.removeItem("historySearch"),this.historySearch=[]},clickKeyWord:function(e){this.$router.push({name:"searchResult",query:{inputWord:e}})}}}),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"search-container",style:{height:e.containerHeight+"px"}},[n("Header",{ref:"header"}),e._v(" "),n("div",{staticClass:"history-search"},[n("div",{staticClass:"history-search-head"},[n("div",[e._v("最近搜索")]),e._v(" "),n("div",{staticStyle:{color:"#0b89dc"},on:{click:e.clearHistorySearch}},[e._v("清除")])]),e._v(" "),n("div",{staticClass:"history-search-content"},e._l(e.historySearch,function(t){return n("div",{on:{click:function(n){e.clickKeyWord(t)}}},[e._v(e._s(t))])}),0)])],1)},c=[],s=n("2455");function l(e){n("ddd3")}var u=!1,h=l,d="data-v-45a84469",f=null,p=Object(s["a"])(i,o,c,u,h,d,f);t["default"]=p.exports},"7ea2":function(e,t,n){"use strict";var r=n("f499"),a=n.n(r),i=(n("ac6a"),n("a3a3")),o=n("2b0e");o["default"].use(i["a"]);o["default"].use(i["a"]);var c={data:function(){return{keyword:""}},created:function(){this.$route.query.inputWord&&(this.keyword=this.$route.query.inputWord)},methods:{toSearch:function(){-1==this.$route.path.indexOf("search$")&&(console.log("跳转到搜索页面",this.$route.path.indexOf("search")),this.$router.push({name:"search",query:{inputWord:this.keyword}}))},search:function(){var e=this;try{if(""!=this.keyword.trim()){var t=[];localStorage.getItem("historySearch")&&(t=JSON.parse(localStorage.getItem("historySearch")));var n=!1;t.forEach(function(t){e.keyword!=t||(n=!0)}),n||(t.unshift(this.keyword),console.log("historySearch",t,t.length),t.length>10&&(t=t.slice(0,10)),localStorage.setItem("historySearch",a()(t))),this.$router.push({name:"searchResult",query:{inputWord:this.keyword}})}else this.$vux.toast.show({type:"text",text:"请输入您要搜索的商品",width:"15em"}),this.keyword=""}catch(r){console.log("出现异常",r),localStorage.removeItem("historySearch")}}}},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header",attrs:{id:"header"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],ref:"searchInput",class:{searchInput:-1!=e.$route.path.indexOf("search")},attrs:{type:"text",placeholder:"搜索商品"},domProps:{value:e.keyword},on:{focus:e.toSearch,input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),e._v(" "),n("div",{staticClass:"search",on:{click:e.search}},[e._v("搜索")])])},l=[],u=n("2455");function h(e){n("7f5e")}var d=!1,f=h,p="data-v-7169fa56",g=null,x=Object(u["a"])(c,s,l,d,f,p,g);t["a"]=x.exports},"7f5e":function(e,t,n){var r=n("26ab");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("499e").default;a("1bf78fe7",r,!0,{})},"83a1":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"8fba":function(e,t,n){"use strict";var r={data:function(){return{remainHeight:100}},mounted:function(){this.$nextTick(function(){this.remainHeight=window.innerHeight-window.document.getElementById("header").clientHeight-window.document.getElementById("menu").clientHeight})}},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"order-container",style:{height:e.remainHeight+"px"}},[e._t("default")],2)},i=[],o=n("2455"),c=!1,s=null,l=null,u=null,h=Object(o["a"])(r,a,i,c,s,l,u);t["a"]=h.exports},a21f:function(e,t,n){var r=n("584a"),a=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},ac6a:function(e,t,n){for(var r=n("cadf"),a=n("0d58"),i=n("2aba"),o=n("7726"),c=n("32e9"),s=n("84f2"),l=n("2b4c"),u=l("iterator"),h=l("toStringTag"),d=s.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=a(f),g=0;g<p.length;g++){var x,m=p[g],y=f[m],b=o[m],v=b&&b.prototype;if(v&&(v[u]||c(v,u,d),v[h]||c(v,h,m),s[m]=d,y))for(x in r)v[x]||i(v,x,r[x],!0)}},b0c5:function(e,t,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},ddd3:function(e,t,n){var r=n("617a");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("499e").default;a("0bac364b",r,!0,{})},f499:function(e,t,n){e.exports=n("a21f")}}]);
//# sourceMappingURL=chunk-8136d6ae.cfbce458.js.map