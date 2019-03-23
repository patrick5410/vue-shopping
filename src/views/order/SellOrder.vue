<template>
  <div class="sell-order-container">
    <OrderCom :orders="showOrders" :hiddenBottom="true"></OrderCom>
  </div>
</template>

<script>
  import OrderCom from '@/components/OrderCom'


  export default {
    components: {
      OrderCom
    },
    data: function () {
      return {
        showOrders:[{
          "addressInfo":{
            "receivePhone":null,
            "addressDetail":null,
            "receiveName":null,
            "autoReceiveDate":null,
            "addressArea":null,
            "addressId":null
          },
          "deliveryUpdateContent":null,
          "orderId":"HSG20190315101812181",
          "totalPrice":729.0000,
          "sendDate":null,
          "leaveWord":null,
          "goods":[
            {
              "goodImg":"https://www.kfzimg.com/G06/M00/D5/18/p4YBAFqgnDKAPDdVAADtT1xce-g487_s.jpg",
              "goodOriginalPrice":1210.0000,
              "buyCount":1,
              "goodSpecificationItemIds":"0",
              "goodName":"三重门",
              "goodSpecificationItems":"书籍规格：默认",
              "goodScore":729,
              "goodId":2606,
              "goodPrice":729.0000
            }
          ],
          "autoReceiveDate":null,
          "deliveryCompany":null,
          "paymentAmount":729.0000,
          "orderStateStr":"已取消",
          "orderState":2,
          "shipperCode":null,
          "score":729,
          "deliveryId":null,
          "goodCount":1,
          "deliveryUpdateDate":null,
          "createDate":"2019-03-15  10:18:13",
          "deliveryMoney":0.0000
        },
      {
        "addressInfo":{
        "receivePhone":null,
          "addressDetail":null,
          "receiveName":null,
          "autoReceiveDate":null,
          "addressArea":null,
          "addressId":null
      },
        "deliveryUpdateContent":null,
        "orderId":"HSG20190315101800180",
        "totalPrice":599.0000,
        "sendDate":null,
        "leaveWord":null,
        "goods":[
        {
          "goodImg":"https://www.kfzimg.com/G06/M00/C7/76/p4YBAFqYQFCAKs5UAABdIXVQrqo584_s.jpg",
          "goodOriginalPrice":1133.0000,
          "buyCount":1,
          "goodSpecificationItemIds":"0",
          "goodName":"简洁之美",
          "goodSpecificationItems":"书籍规格：默认",
          "goodScore":599,
          "goodId":2605,
          "goodPrice":599.0000
        }
      ],
        "autoReceiveDate":null,
        "deliveryCompany":null,
        "paymentAmount":599.0000,
        "orderStateStr":"已取消",
        "orderState":2,
        "shipperCode":null,
        "score":599,
        "deliveryId":null,
        "goodCount":1,
        "deliveryUpdateDate":null,
        "createDate":"2019-03-15  10:18:02",
        "deliveryMoney":0.0000
      }]
      }
    }
  }
</script>
