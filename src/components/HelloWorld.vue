<template>
  <div class="hello">
    <Checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</Checkbox>
    <div style="margin: 15px 0;"></div>
    <CheckboxGroup v-model="checkedCities" @change="handleCheckedCitiesChange">
      <Checkbox v-for="city in cities" :label="city" :key="city">{{city}}</Checkbox>
    </CheckboxGroup>

    <!--测试嵌套-->
    <slot></slot>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup } from 'element-ui'
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: 'HelloWorld',
  components:{
    Checkbox,
    CheckboxGroup
  },
  data(){
    return{
      value: '',
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods:{
    handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .hello{
    margin-top:50px;
    .el-checkbox__inner{
      border-radius: 100%
    }
  }
</style>
