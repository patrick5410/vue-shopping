# wx_shopping
微信公众号商城后台
# node-elm 接口文档
```

baseUrl: https://elm.cangdu.org

```

## 目录：

[1、获取用户信息](#1获取用户信息)<br/>
[2、分页获取所有商品](#2分页获取所有商品)<br/>
[3、获取推荐类型](#3获取推荐类型)<br/>
[4、获取所有分类](#4获取所有分类)<br/>
[5、获取某个类型商品](#5获取某个类型商品)<br/>
[6、搜索商品](#6搜索商品)<br/>
[7、获取购物车商品](#7获取购物车商品)<br/>
[8、添加商品到购物车](#8添加商品到购物车)<br/>
[9、改变购物车商品数量](#9改变购物车商品数量)<br/>
[10、删除购物车商品](#10删除购物车商品)<br/>
[11、猜你喜欢商品（还待完善）](#11猜你喜欢商品（还待完善）)<br/>
[12、获取收藏商品](#12获取收藏商品)<br/>
[13、收藏商品](#13收藏商品)<br/>
[14、删除收藏](#14删除收藏)<br/>
[15、获取所有地址](#15获取所有地址)<br/>
[16、设置默认地址](#16设置默认地址)<br/>
[17、添加地址](#17添加地址)<br/>
[18、编辑地址](#18编辑地址)<br/>
[19、删除地址](#19删除地址)<br/>
[20、生成订单（下单）](#20生成订单（下单）)<br/>
[21、支付订单](#21支付订单)<br/>
[22、获取所有订单](#22获取所有订单)<br/>
[23、取消订单](#23取消订单)<br/>
[24、申请退款](#24申请退款)<br/>
[25、确认收货](#25确认收货)<br/>
[26、申请退货（还待完善）](#26申请退货（还待完善）)<br/>
[27、查看订单详情](#27查看订单详情)<br/>
[28、删除订单](#28删除订单)<br/>
[29、商品详情](#29商品详情)<br/>




## 接口列表：

```
说明：
    基于HTTPS协议POST请求的所有接口，都以JSON格式的数据进行交互提供服务
    正式接口请求路径为：https:////www.tdxiov.com:18443/shopping+URL
    测试接口请求路径为：https:////www.tdxiov.com:28443/shopping+URL
```

### 1、获取用户信息

#### 请求URL:  
```
/user/getUserInfo
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|code      |Y       |string  |该值必须通过微信相关接口获取 |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
		"wechatInfo": {
			"country": "",
			"province": "",
			"openid": "ombfhjrXOOwRca9rGW3z6BHrHE-M",
			"sex": "0",
			"nickname": "陈健",
			"headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/YcLaJnTcC0J2WvcNZsvfA3460ibw9jicYN0kk0zYEMKqLZgFaibYXzXjJC03jUjPhcmia6BentrbUJiacDHRs7zkP4A/132"
		},
		"phone": "13425816454",
		"creditScore": 666
	}
}
```

### 2、分页获取所有商品

#### 请求URL：
```
/good/getGoods
```


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|currentPage      |N       |int   |当前页数，默认为第1页，传入值大于总页数时为最后一页 |

#### 返回示例：
```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
            	"currentPage": 1,
            	"totalPage": 10,
            	"goods": [{
            		"id": 1,
            		"name": "车载配件1",
            		"originalPrice": 1304,
            		"price": 1058,
            		"img": "img/good/1.jpg"
            	}, {
            		"id": 2,
            		"name": "车载配件2",
            		"originalPrice": 1245,
            		"price": 888,
            		"img": "img/good/2.jpg"
            	}]
            }
}
```

### 3、获取推荐类型

#### 请求URL：
```
/class/getRecommend
```


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
            	"classId": 1,
            	"className": "车载配件",
            	"themeImg": "img/good/banner.png"
            }
}
```

### 4、获取所有分类

#### 请求URL：
```
/class/getClasses
```


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
            	"classId": 1,
            	"className": "车载配件",
            	"theme": "爆款人气推荐",
            	"themeImg": "img/good/banner.png",
            	"goods": [{
            		"id": 1,
            		"name": "车载配件1",
            		"originalPrice": 1304,
            		"price": 1058,
            		"img": "img/good/1.jpg"
            	}, {
            		"id": 2,
            		"name": "车载配件2",
            		"originalPrice": 1245,
            		"price": 888,
            		"img": "img/good/2.jpg"
            	}]
            }, {
            	"classId": 2,
            	"className": "车载配件",
            	"theme": "爆款人气推荐",
            	"themeImg": "img/good/banner.png",
            	"goods": [{
            		"id": 3,
            		"name": "车载配件3",
            		"originalPrice": 1888,
            		"price": 166,
            		"img": "img/good/2.jpg"
            	}, {
            		"id": 4,
            		"name": "车载配件4",
            		"originalPrice": 2888,
            		"price": 2000,
            		"img": "img/good/4.jpg"
            	}]
            }]
}
```

### 5、获取某个类型商品

#### 请求URL：
```
/class/getClass
```


#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|classId      |Y       |string  |商品类型id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
		"classId": 2,
		"className": "车载配件",
		"theme": "爆款人气推荐",
		"themeImg": "img/good/banner.png",
		"goods": [{
			"id": 3,
			"name": "车载配件3",
			"originalPrice": 1888,
			"price": 166,
			"img": "img/good/2.jpg"
		}, {
			"id": 4,
			"name": "车载配件4",
			"originalPrice": 2888,
			"price": 2000,
			"img": "img/good/4.jpg"
		}]
	}
}
```

### 6、搜索商品

#### 请求URL：
```
/good/search
```


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|keyword      |Y       |string  |关键字 |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
		"id": 1,
		"name": "车载配件1",
		"originalPrice": 1304,
		"price": 1058,
		"img": "img/good/1.jpg"
	}, {
		"id": 2,
		"name": "车载配件2",
		"originalPrice": 1245,
		"price": 888,
		"img": "img/good/2.jpg"
	}]
}
```


### 7、获取购物车商品

#### 请求URL：
```
/cart/goods
```


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
		"id": 1,
		"name": "车载配件1",
		"originalPrice": 1304,
		"price": 1058,
		"img": "img/good/1.jpg",
		"count": 10,
		"score": 2,
		"isCollect": true
	}, {
		"id": 2,
		"name": "车载配件2",
		"originalPrice": 1245,
		"price": 888,
		"img": "img/good/2.jpg",
		"count": 25,
		"score": 3,
		"isCollect": false
	}]
}
```


### 8、添加商品到购物车

#### 请求URL：
```
/cart/addGood
```


#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |string   |商品Id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```


### 9、改变购物车商品数量

#### 请求URL：
```
/cart/addCount
```


#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |string   |商品Id |
|count      |Y       |string   |更改后商品数量 |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
		"id": 2,
		"name": "车载配件2",
		"originalPrice": 1245,
		"price": 888,
		"img": "img/good/2.jpg",
		"count": 25,
		"score": 3,
		"isCollect": false
	}
}
```

### 10、删除购物车商品

#### 请求URL：
```
/cart/deleteGood
```


#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |string   |商品Id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```


### 11、猜你喜欢商品（还待完善）

#### 请求URL：
```
/good/guess
```


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
		"id": 1,
		"name": "车载配件1",
		"originalPrice": 1304,
		"price": 1058,
		"img": "img/good/1.jpg",
		"score": 2,
		"isCollect": true
	}, {
		"id": 2,
		"name": "车载配件2",
		"originalPrice": 1245,
		"price": 888,
		"img": "img/good/2.jpg",
		"score": 3,
		"isCollect": false
	}]
}
```


### 12、获取收藏商品

#### 请求URL:  
```
/collect/goods
```


#### 请求方式: 
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
		"id": 1,
		"name": "车载配件1",
		"originalPrice": 1304,
		"price": 1058,
		"img": "img/good/1.jpg",
		"score": 2,
		"isCollect": true
	}, {
		"id": 2,
		"name": "车载配件2",
		"originalPrice": 1245,
		"price": 888,
		"img": "img/good/2.jpg",
		"score": 3,
		"isCollect": false
	}]
}
```


### 13、收藏商品

#### 请求URL：
```
/collect/addGood
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |string   |商品Id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```

### 14、删除收藏

#### 请求URL：
```
/collect/deleteGood
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |string   |商品Id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```

### 15、获取所有地址

#### 请求URL：
```
/address/getAll
```



#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
			"addressId": 1,
			"name": "张三",
			"phone": "132489873190",
			"addressArea": "广东省佛山市禅城区石湾街道",
			"addressDetail": "岭南天地",
			"isDefault": true
		},
		{
			"addressId": 2,
			"name": "李四",
			"phone": "132489873191",
			"addressArea": "广东省佛山市禅城区石湾街道",
			"addressDetail": "建新路",
			"isDefault": false
		},
		{
			"addressId": 3,
			"name": "王五",
			"phone": "132489873192",
			"addressArea": "广东省佛山市禅城区石湾街道",
			"addressDetail": "祖庙",
			"isDefault": false
		}
	]
}
```

### 16、设置默认地址

#### 请求URL：
```
/address/setDefault
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|addressId      |Y       |String   |地址Id |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```


### 17、添加地址

#### 请求URL：
```
/address/addAdress
```




#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |String   |姓名 |
|phone      |Y       |String   |手机号码 |
|addressCode      |Y       |String   |所在地编码 |
|addressArea      |Y       |String   |所在区域 |
|addressDetail      |Y       |String   |详细地址 |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```

### 18、编辑地址

#### 请求URL：
```
/address/editAdress
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|addressId      |Y       |String   |地址Id |
|name      |Y       |String   |姓名 |
|phone      |Y       |String   |手机号码 |
|addressCode      |Y       |String   |所在地编码 |
|addressArea      |Y       |String   |所在区域 |
|addressDetail      |Y       |String   |详细地址 |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```

### 19、删除地址

#### 请求URL：
```
/address/deleteAddress
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|addressId      |Y       |String   |地址Id |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
			"addressId": 1,
			"name": "张三",
			"phone": "132489873190",
			"addressArea": "广东省佛山市禅城区石湾街道",
			"addressDetail": "岭南天地",
			"isDefault": true
		},
		{
			"addressId": 2,
			"name": "李四",
			"phone": "132489873191",
			"addressArea": "广东省佛山市禅城区石湾街道",
			"addressDetail": "建新路",
			"isDefault": false
		},
		{
			"addressId": 3,
			"name": "王五",
			"phone": "132489873192",
			"addressArea": "广东省佛山市禅城区石湾街道",
			"addressDetail": "祖庙",
			"isDefault": false
		}
	]
}

```

### 20、生成订单（下单）

#### 请求URL：
```
/order/createOrder
```

#### 示例：

#### 请求方式：
```
POST
```

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |string   |商品Id |
|buyCount      |Y       |string   |商品数量 |

#### 请求示例：

```javascript
[{
    "goodId":10,
    "buyCount":10
},{
      "goodId":11,
      "buyCount":2
  }]
```

#### 返回示例：

```javascript
{
	"orderId": 12,
	"orderState": 1,
	"orderStateStr": "待付款",
	"orderDate": "2019-01-21 21:51:21",
	"totalPrice": 9106,
	"deliveryMoney": 0,
	"paymentAmount": 9106,
	"goodCount": 6,
	"leaveWord": "",
	"addressInfo": {
		"addressId": 1,
		"addressArea": "广东省佛山市禅城区张槎街道",
		"addressDetail": "江湾一路18号（佛山科学技术学院仙溪校区）",
		"receiveName": "李世虎",
		"receivePhone": "13425816985"
	},
	"goods": [{
			"id": 125,
			"name": "华为手机",
			"originalPrice": 1108,
			"price": 1058,
			"buyCount": 5,
			"img": "img/good/1.jpg"
		},
		{
			"id": 128,
			"name": "戴尔电脑",
			"originalPrice": 3855,
			"price": 3566,
			"buyCount": 1,
			"img": "img/good/2.jpg"
		}
	]
}
```


### 21、支付订单

#### 请求URL：
```
/order/pay
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |
|addressId      |Y       |String   |地址id，用于修改订单收货信息 |
|leaveWord      |Y       |String   |买家留言 |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
		"appId": "wx2421b1c4370ec43b",
		"timeStamp": "4448989744",
		"nonceStr": "IITRi8Iabbblz1Jc",
		"signType": "MD5",
		"package": "wx201411101639507cbf6ffd8b0779950874",
		"paySign": "7921E432F65EB8ED0CE9755F0E86D72F"
	}
}
```


### 22、获取所有订单

#### 请求URL：
```
/order/getOrders
```



#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": [{
		"orderId": 12,
		"orderState": 1,
		"orderStateStr": "待付款",
		"orderDate": "2019-01-21 21:51:21",
		"totalPrice": 9106,
		"deliveryMoney": 0,
		"paymentAmount": 9106,
		"goodCount": 6,
		"leaveWord": "",
		"addressInfo": {
			"addressId": 1,
			"addressArea": "广东省佛山市禅城区张槎街道",
			"addressDetail": "江湾一路18号（佛山科学技术学院仙溪校区）",
			"receiveName": "李世虎",
			"receivePhone": "13425816985"
		},
		"goods": [{
				"id": 125,
				"name": "华为手机",
				"originalPrice": 1108,
				"price": 1058,
				"buyCount": 5,
				"img": "img/good/1.jpg"
			},
			{
				"id": 128,
				"name": "戴尔电脑",
				"originalPrice": 3855,
				"price": 3566,
				"buyCount": 1,
				"img": "img/good/2.jpg"
			}
		]
	}, {
		"orderId": 14,
		"orderState": 2,
		"orderStateStr": "待发货",
		"orderDate": "2019-01-21 21:51:21",
		"totalPrice": 9106,
		"deliveryMoney": 0,
		"paymentAmount": 9106,
		"goodCount": 6,
		"leaveWord": "",
		"addressInfo": {
			"addressId": 1,
			"addressArea": "广东省佛山市禅城区张槎街道",
			"addressDetail": "江湾一路18号（佛山科学技术学院仙溪校区）",
			"receiveName": "李世虎",
			"receivePhone": "13425816985"
		},
		"goods": [{
				"id": 125,
				"name": "华为手机",
				"originalPrice": 1108,
				"price": 1058,
				"buyCount": 5,
				"img": "img/good/1.jpg"
			},
			{
				"id": 128,
				"name": "戴尔电脑",
				"originalPrice": 3855,
				"price": 3566,
				"buyCount": 1,
				"img": "img/good/2.jpg"
			}
		]
	}]
}
```

### 23、取消订单

#### 请求URL：
```
/order/cancelOrder
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```


### 24、申请退款

#### 请求URL：
```
/order/refund
```



#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```

### 25、确认收货

#### 请求URL：
```
/order/confirmReceive
```



#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |



#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```

### 26、申请退货（还待完善）

#### 请求URL：
```
/order/back
```

#### 示例：


#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```


### 27、查看订单详情

#### 请求URL：
```
/order/orderDetail
```

#### 示例：


#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
		"orderId": 14,
		"orderState": 2,
		"orderStateStr": "待发货",
		"orderDate": "2019-01-21 21:51:21",
		"totalPrice": 9106,
		"deliveryMoney": 0,
		"paymentAmount": 9106,
		"goodCount": 6,
		"leaveWord": "",
		"deliveryUpdateContent": "您已提价订单，请等待物流信息更新",
		"deliveryUpdateDate": "2019-02-13 10:46:15",
		"addressInfo": {
			"addressId": 1,
			"addressArea": "广东省佛山市禅城区张槎街道",
			"addressDetail": "江湾一路18号（佛山科学技术学院仙溪校区）",
			"receiveName": "李世虎",
			"receivePhone": "13425816985"
		},
		"goods": [{
				"id": 125,
				"name": "华为手机",
				"originalPrice": 1108,
				"price": 1058,
				"buyCount": 5,
				"specification": "红色",
				"img": "img/good/1.jpg"
			},
			{
				"id": 128,
				"name": "戴尔电脑",
				"originalPrice": 3855,
				"price": 3566,
				"buyCount": 1,
				"specification": "红色",
				"img": "img/good/2.jpg"
			}
		]
	}
}
```

### 28、删除订单

#### 请求URL：
```
/order/deleteOrder
```



#### 请求方式：
```
POST
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|orderId      |Y       |String   |订单id |


#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": null
}
```


### 29、商品详情

#### 请求URL：
```
/good/detail
```

#### 示例：


#### 请求方式：
```
GET
```


|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|goodId      |Y       |String   |商品id |

#### 返回示例：

```javascript
{
	"success": true,
	"errorCode": null,
	"errorDesc": null,
	"data": {
		"id": 1,
		"name": "车载配件1",
		"originalPrice": 1304,
		"price": 1058,
		"img": "img/good/1.jpg",
		"slideshow": ["img/good/1.jpg", "img/good/2.jpg", "img/good/3.jpg"],
		"specification": ["红色", "蓝色", "黄色"],
		"explain": "本商品为电子产品，七天内可以退货，如有问题可以联系客服",
		"detailHtml": "此处为富文本内容",
		"score": 2,
		"isCollect": true
	}
}
```

