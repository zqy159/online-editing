<template>
  <div id="buildCode">
    <div class="online-header">
      <el-button type="success" class="run" @click="handleRun">运行</el-button>
      <el-button type="success" class="run" @click="drawer = true">打开调试器</el-button>
      <el-select v-model="languageValue" placeholder="请选择被编译的语言" style="margin-left:50px;">
        <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <telescopicPanel :panelData="panelData">
      <div slot="left">
        <ideConfigure :languageValue="languageValue" ref="ideCode"></ideConfigure>
      </div>
      <div slot="right">
        <iframe src="http://localhost:8067/template/online-editing/buildView">

        </iframe>
        <!-- <div id="showView">
        </div> -->
      </div>
    </telescopicPanel>
    <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      11111111
    </el-drawer>
  </div>
</template>

<script>
import ideConfigure from "@/components/ideConfigure"
import telescopicPanel from "@/components/telescopicPanel"
import Vue from 'vue'
export default {
  name: 'buildCode',
  components: {
    telescopicPanel,
    ideConfigure
  },
  data() {
    return {
      panelData: {
        leftWidth: 500,
      },
      direction: 'rtl',

      drawer: false,
      languageOptions: [
        {
          label: 'js',
          value: 'text/javascript'
        },
        {
          label: 'vue',
          value: 'text/x-vue'
        },
        {
          label: 'html',
          value: 'text/html'
        }
      ],
      languageValue: 'text/x-vue'
    }
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleRun() {
      this.buildDom()
    },
    buildDom() {
      let code = this.$refs.ideCode.getValue()
      const script = this.getSource(code, 'script').replace(
        /export default/,
        'return '
      )
      const css = this.getSource(code, 'style')
      const template =
        '<div id="code-running">' +
        this.getSource(code, 'template') +
        '</div>'

      this.$store.commit('muBuildData', {
        script,
        template,
        css
      })
      console.log(this.$store.state)



    },
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)
      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      )
    },
  }
}
</script>

<style lang="less">
.online-header {
  height: 54px;
  background: #3f3f3f;
  z-index: 2;
  width: 100%;
  position: relative;
  .run {
    margin: 5px 0 0 20px;
  }
}
</style>
