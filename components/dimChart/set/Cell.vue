<template>
  <g class="cell-parts">
    <rect
      v-for="(item, index) in 10"
      :key="item"
      :x="chart.gap"
      :y="(index + 1) * (chart.height / 10)"
      :width="chart.gapWidth()"
    />
  </g>
  <g class="cell-xy">
    <rect :x="chart.gap - 1" y="0" width="1" :height="chart.height" />
    <rect
      :x="chart.gap"
      :y="chart.zero() - 1"
      :width="chart.gapWidth()"
      height="1"
    />
  </g>
</template>

<script>
export default {
  name: "Cell",
  props: {
    chart: Object,
  },
};
</script>

<style scoped lang="scss">
.cell-xy {
  fill: var(--color-white);
}
.cell-parts rect {
  height: 1px;
  fill: var(--color-white);
  opacity: 0.25;
}
</style>