<template>
  <div class="x-axis">
    <template v-for="(point, i) in points" :key="point.date">
      <span class="date-item" v-if="xxx.includes(i)" :style="datePosition(i)">
        {{ point.date }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: "Xaxis",
  props: {
    chart: Object,
    points: Array,
  },
  computed: {
    xxx() {
      let successArr = [];
      if (this.points.length > 10) {
        let cutStep = Math.round(this.points.length / 4);
        let accum = 0;

        for (let i = 0; i < this.points.length; i++) {
          if (i === accum) {
            successArr.push(i);
            accum += cutStep;
          }
        }
        successArr = successArr.map((el, i) => {
          if (i) {
            return el - 1;
          } else {
            return el;
          }
        });
        successArr.push(this.points.length - 1);
        return successArr;
      } else {
        for (let i = 0; i < this.points.length; i++) {
          successArr.push(i);
        }
        return successArr;
      }
    },
  },
  methods: {
    datePosition(index) {
      return `left:${
        index * (this.chart.gapWidth() / (this.points.length - 1))
      }px`;
    },
  },
};
</script>

<style scoped lang="scss">
.x-axis {
  //background: rgb(138, 130, 218);
  grid-column: 1 / -1;
  position: relative;
}
.date-item {
  position: absolute;
  top: 25px;
  font-size: var(--fs-d3);
  transform: translateX(0px);
  &:first-child {
    transform: translateX(10px);
  }
  &:last-child {
    transform: translateX(-10px);
  }
}
</style>