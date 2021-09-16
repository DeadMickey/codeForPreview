<template>
  <div class="y-axis">
    <div class="y-axis-part" v-for="i in 11" :key="i">
      {{ procentStep(i) }}
    </div>
  </div>
</template>

<script>
import { stripFloat } from "@/mixins/_global";
export default {
  name: "Yaxis",
  props: {
    chart: Object,
  },
  methods: {
    procentStep(index) {
      let abs = [];
      let gid = [];
      for (let i = 0; i <= 11; i++) {
        if (this.chart?.max) {
          if (!(i % 2)) {
            let getProc = ((i * 10) / 100) * this.chart.max;
            if (String(getProc).length > 3 && getProc > 1) {
              getProc = stripFloat(getProc, 2);
            } else {
              getProc = stripFloat(getProc, 8);
            }
            abs.push(getProc);
            gid.push(-getProc);
          }
        } else {
          abs.push(0);
          gid.push(0);
        }
      }
      return abs.reverse().concat(gid.slice(1))[index - 1];
    },
  },
  updated() {
    this.$emit("yUpdates", this.$el.offsetWidth);
  },
};
</script>

<style scoped lang="scss">
.y-axis {
  display: grid;
  height: 100%;
  //min-width: 25px;
  text-align: end;
  line-height: 1;
  grid-template-rows: repeat(10, 1fr);
  font-size: var(--fs-d3);
}
</style>