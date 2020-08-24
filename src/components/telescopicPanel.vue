<template>
  <div class="telescopicPanel">
    <div class="layout-container" @mousemove.prevent="bindMouseover($event)" @mouseup.prevent="bindUp" v-if="direction==='row'">

      <div style="height:calc(100% - 56px);background:#f00;position: absolute;" :style="{width:leftWidth+'px'}">
        <slot name="left"></slot>
      </div>
      <div class="resizable-row" @mousedown.prevent="bindDown" :style="{left:leftWidth+'px'}"></div>
      <div style="height:calc(100% - 56px);position: absolute" :style="{width:'calc(100% - '+(leftWidth+2)+'px)',left:(leftWidth+2)+'px'}">
        <slot name="right"></slot>
      </div>

    </div>
    <div class="layout-container" @mousemove.prevent="bindMouseover($event)" @mouseup.prevent="bindUp" v-if="direction==='column'">
      <div style="width:calc(100% - 52px);background:#f00;position: absolute;" :style="{height:topHeight+'px'}">
        <slot name="top"></slot>
      </div>
      <div class="resizable-column" @mousedown.prevent="bindDown" :style="{top:topHeight+'px'}"></div>
      <div style="width:100%;position: absolute;" :style="{height:'calc(100% - '+(topHeight+2)+'px)',top:(topHeight+2)+'px'}">
        <slot name="bottom"></slot>
      </div>
    </div>
    <!-- </div> -->

  </div>
</template>

<script>
export default {
  props: {
    panelData: Object,
  },
  data() {
    return {
      leftWidth: 0,
      topHeight: 0,
      isDown: false,
      direction: 'row',
      intervalPos: {
        x: 0,
        y: 0
      }
      // intervalPos
    }
  },
  created() {
    this.leftWidth = this.panelData.leftWidth
    this.topHeight = this.panelData.topHeight
    this.direction = this.panelData.direction ? this.panelData.direction : 'row'
  },
  methods: {
    bindMouseover(e) {
      if (e.x && this.isDown) {
        this.leftWidth = e.x - this.intervalPos.x
        this.topHeight = e.y - this.intervalPos.y
      }
    },
    bindDown(e) {
      console.log('点击目标')
      this.intervalPos.x = e.x - (this.leftWidth ? this.leftWidth : 0)
      this.intervalPos.y = e.y - (this.topHeight ? this.topHeight : 0)
      //   console.log(this.intervalPos)
      this.isDown = true
    },
    bindUp() {
      console.log('失去目标')
      clearInterval(this.timerId)
      this.isDown = false
    },
  }
}
</script>

<style lang="less">
.layout-container {
  height: 100%;
}
.resizable-row {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #000;
  left: 250px;
  right: 0;
  width: 2px;
  cursor: e-resize;
  /* cursor: col-resize; */
}

.resizable-row::after {
  // content: "";
  // width: 2px;
  // height: 100%;
  // border-left: 2px solid #ccc;
  // border-right: 2px solid #ccc;
  // position: absolute;
  // left: 2px;
}
.resizable-column {
  position: absolute;
  top: 250px;
  bottom: 0;
  background: #000;
  left: 0;
  right: 0;
  height: 2px;
  cursor: n-resize;
  /* cursor: col-resize; */
}
.resizable-column::after {
  content: "";
  height: 2px;
  width: 100%;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  position: absolute;
  top: 2px;
}
</style>

