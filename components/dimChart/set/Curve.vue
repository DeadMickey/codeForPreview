<template>
  <path :d="curveStr" :class="['curve', { 'curve-fill': isFill }]" />
</template>

<script>
export default {
  name: "Curve",
  props: {
    points: Array,
    chart: Object,
  },
  data: () => ({ isFill: false }),
  computed: {
    curvePoints() {
      let cPoints = [];
      this.points.forEach((item, index) => {
        if (index != this.points.length - 1) {
          cPoints.push({
            id: index + 1,
            step: item.xstep,
            x1: item.x,
            y1: item.y,
            x2: this.points[index + 1].x,
            y2: this.points[index + 1].y,
          });
        }
      });
      return cPoints;
    },
    curveStr() {
      let cString = ``;
      this.curvePoints.forEach((item, index) => {
        if (!index) {
          cString = `M ${item.x1} ${item.y1} C ${item.x1 + item.step} ${
            item.y1
          } ${item.x2 - item.step} ${item.y2} ${item.x2} ${item.y2} `;
        } else {
          cString += `C ${item.x1 + item.step} ${item.y1} ${
            item.x2 - item.step
          } ${item.y2} ${item.x2} ${item.y2} `;
        }
      });
      if (this.isFill) {
        let full = this.points.slice(-1)[0];
        cString += `C ${full.x} ${full.y} ${full.x} ${this.chart.height} ${full.x} ${this.chart.height}`;
        cString += `C ${this.chart.gap} ${this.chart.height} ${this.chart.gap} ${this.chart.height} ${this.chart.gap} ${this.chart.height}`;
      }
      return cString;
    },
  },
};
</script>

<style scoped lang="scss">
.curve {
  stroke: #4bd28b;
  stroke-width: 1.5;
  fill: transparent;
  stroke-dashoffset: 0;
  //transition: 1s;
  clip-path: url(#mask);
  &-fill {
    fill: #4bd28a12;
  }
}
</style>