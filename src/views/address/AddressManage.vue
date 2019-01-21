<template>
    <div class="addressManage">
        <div class="addressCard">
            <div class="container">
                <div class="name_phone">{{name}}&emsp;&emsp;{{phone}}</div>
                <div class="address">{{address}}</div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    data () {
        return {
            name: '某某某',
            phone: '132489873190',
            address: '广东省佛山市禅城区季华二路国家火炬创新创业园'
        }
    }
}
</script>
<style lang='scss' scoped>
    .addressManage{
        width: 100vw;
        background-color: #e5e5e5;
        font-size: 16px;
        .addressCard{
            width: 100%;
            height: 100px;
            background-color: #fff;
            .container{
                .name_phone{
                    color: rgb(51, 51, 51)
                }
            }
        }
    }
</style>
