<template>
    <div class="header">
        <input type="text" placeholder="搜索商品">  
    </div>
    
</template>
<script>
export default {
    
}
</script>

<style lang="scss">
    .header{
        position: fixed;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        top: 0;
        left: 0;
        height: 36px;
        width: 375px;
        background-color: white;
        border-bottom: #e5e5e5 1px solid;
        box-sizing: border-box;
        input{
            height: 28px;
            width: 355px;
            font-size: 12px;
            background-color: #e5e5e5;
            background-image: url('/img/search.png');
            background-repeat: no-repeat;
            background-size: 16px 16px;
            background-position-x: 5px;
            background-position-y: center;
            border-radius: 3px ;
            outline: none;
            border: 0;
            padding-left:25px; 
        };
    }
</style>
