<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['buildData'])
  },
  watch: {
    buildData: {
      deep: true, //深度监听设置为 true
      handler(newV, oldV) {
        console.log(newV, 'xxx')
      }
    },
  },

}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
}
</style>
