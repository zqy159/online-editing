<template>
  <div id="showView">
    111
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['buildData'])
  },
  watch: {
    buildData: {
      deep: true, //深度监听设置为 true
      handler(newV, oldV) {
        console.log(newV)
        const common = new Function(newV.script)()
        common.template = newV.template
        const Template = Vue.extend(common)
        this.program = new Template()
        let dom = document.querySelector('#showView')
        while (dom.hasChildNodes()) {
          dom.removeChild(dom.firstChild);
        }
        dom.appendChild(this.program.$mount().$el)

        if (newV.css !== '') {
          const styles = document.createElement('style')
          styles.type = 'text/css'
          styles.innerHTML = newV.css
          document.getElementsByTagName('head')[0].appendChild(styles)
        }
      }
    },
  },
  mounted() {


  }
}
</script>
