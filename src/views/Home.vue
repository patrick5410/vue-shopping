<template>
  <div class="home">
    <Header></Header>
    <Credit></Credit>
  </div>
</template>

<script>
import Header from '@/components/head/Header.vue'
import Credit from '@/components/Credit.vue'
export default {
  name: 'home',
  components: {
    Header,
    Credit
  }
}
</script>
