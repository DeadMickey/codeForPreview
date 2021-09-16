<template>
  <div class="hover-bg-part" :style="partsStyle">
    <slot></slot>
  </div>
</template>
<script>
import { randomInt, randomFloat } from "@/mixins/_global";
export default {
  name: "HoverBgPart",
  data: () => ({
    timerId: null,
    size: randomInt(12, 24),
    top: randomInt(70, 100),
    left: randomInt(0, 100),
    speed: randomFloat(0.5, 1.5).toFixed(2),
  }),
  computed: {
    partsStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        left: `${this.left}%`,
        top: `${this.top}%`,
      };
    },
  },
  methods: {
    timer() {
      if (this.top > 0) {
        this.top -= this.speed;
      }
      this.timerId = setTimeout(this.timer, 24);
    },
  },
  mounted() {
    this.timerId = setTimeout(this.timer(), 24);
  },
  watch: {
    top() {
      if (this.top <= 0) {
        this.$emit("partWayEnd");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.hover-bg-part {
  position: absolute;
  //border-radius: 50%;
  //border: 2px solid rgba(255, 255, 255, 0.268);
  background-color: rgba(0, 0, 0, 0.2);
  top: 100%;
  opacity: 0.5;
  //transition: 1s linear;
}
</style>