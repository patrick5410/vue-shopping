<!--订单详情-->
<template>
    <div class="orderDetail-container">
        <div class="head">
            <div class="content">
                <div>已取消</div>
            </div>
        </div>

        <div class="receive">
            <div class="receive-address">
                <div class="left">
                    <img src="../../assets/img/delivery.png">
                </div>
                <div class="right">
                    <div class="delivery-info">
                        <div>您已提交订单，请等待物流信息更新</div>
                    </div>
                    <div class="update-update">
                        更新时间：2019-01-28 13:02:58
                    </div>
                </div>
            </div>


            <div class="receive-info">
                <div class="left">
                    <img src="../../assets/img/position.png">
                </div>
                <div class="right">
                    <div class="name-phone">
                        <div>张三&nbsp;&nbsp;&nbsp;13425816545</div>
                    </div>
                    <div class="address">
                        广东省佛山市禅城区石湾街道江湾一路18号佛山科学技术学院（江湾校区）
                    </div>
                </div>
            </div>


            <!--<div class="left">-->
            <!--<img src="../../assets/img/position.png">-->
            <!--</div>-->
            <!--<div class="right">-->
            <!--<div class="name-phone">-->
            <!--<div>张三&nbsp;&nbsp;&nbsp;13425816545</div>-->
            <!--</div>-->
            <!--<div class="address">-->
            <!--广东省佛山市禅城区石湾街道江湾一路18号佛山科学技术学院（江湾校区）-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<style lang="less" scoped>

    .orderDetail-container {
        width: 100%;
        /*background-color: #e5e5e5;*/
        position: relative;


        .head {
            width: 100%;
            height: 90px;
            background-color: white;

            .content {
                width: 100%;
                height: 100%;
                background-color: #e54545;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;

                div {
                    text-align: left;
                    padding-top: 15px;
                    padding-left: 20px;
                    color: white;
                    font-size: 16px;
                }
            }
        }

        .receive {
            /*display: flex;*/
            width: 325px;
            /*height: 80px;*/
            padding: 0 10px 20px 10px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.5);
            position: absolute;
            left: 15px;
            top: 60px;
            z-index: 20;
            font-size: 14px;
            /*padding-bottom: 20px;*/


            .left {
                width: 30px;
                height: 25px;
            }

            .right {
                margin-left: 5px;
                width: 290px;
                height: 25px;
            }



            .receive-address{
                width: 100%;
                height: 55px;
                display: flex;
                text-align: left;

                .delivery-info{
                    height: 25px;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                }

                img{
                    position: relative;
                    top: 10px;
                    width: 25px;
                    height: auto;
                }

                .update-update{
                    color: #808080;
                }
            }



            .receive-info {
                width: 100%;
                height: 60px;
                display: flex;
                text-align: left;

                img {
                    position: relative;
                    top: 10px;
                    height: 25px;
                    width: auto;
                }

                .name-phone {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    height: 25px;
                    margin-top: 10px;
                }

                .address {
                    text-align: left;
                    line-height: 17px;
                    color: #808080;
                }
            }




        }
    }
</style>
