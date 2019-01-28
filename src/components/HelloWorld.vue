<template>
  <div class="hello">
    <inline-x-number></inline-x-number>
    <Checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange">全选</Checkbox>
    <div style="margin: 15px 0;"></div>
    <CheckboxGroup v-model="checkedCities" @change="handleCheckedCitiesChange">
      <Checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script>
import { InlineXNumber } from 'vux'
export default {
  name: 'HelloWorld',
  components: {
    InlineXNumber
  },
  data() {
    return {
      checkedCities:[]
      }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hello {
  margin-top: 50px;
  .el-checkbox__inner {
    border-radius: 100%;
  }
}
</style>
