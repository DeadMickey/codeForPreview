<template>
  <g class="points">
    <circle
      class="point"
      v-for="point in points"
      :key="point.id"
      :cx="point.x"
      :cy="point.y"
      r="3"
    />
    <circle
      ref="pointCur"
      class="point-cur"
      :cx="curPos.x"
      :cy="curPos.y"
      r="6"
      @mouseover="hover($event)"
      @mouseleave="hover($event)"
    />
  </g>
</template>

<script>
export default {
  name: "Point",
  props: {
    points: Array,
  },
  data: () => ({
    mouseX: null,
    curPos: {
      x: 0,
      y: 200,
    },
  }),
  methods: {
    hover({ type, target }) {
      target.setAttribute("r", `${type == "mouseover" ? 10 : 6}`);
    },
    mouseOnCurPoint(pointCircle) {
      this.points.forEach((el) => {
        let hw = el.xstep;
        if (this.mouseX > el.x - hw && this.mouseX < el.x + hw) {
          this.curPos.x = `${el.x}px`;
          this.curPos.y = `${el.y}px`;
          pointCircle.style.left = `${el.x + 15}px`;
          pointCircle.style.top = `${el.y - 50}px`;
          pointCircle.style.display = "flex";
          this.$refs.pointCur.style.display = "initial";
          this.$emit("currentPoint", { date: el.date, point: el.legPoint });
        }
      });
    },
  },
  mounted() {
    let pointCircle = document.getElementById("pointCircle");
    this.$el.parentElement.onmousemove = (e) => {
      this.mouseX = e.offsetX;
      this.mouseOnCurPoint(pointCircle);
    };
    this.$el.parentElement.onmouseleave = () => {
      pointCircle.style.display = "none";
      this.$refs.pointCur.style.display = "none";
    };
  },
};
</script>

<style scoped lang="scss">
.point {
  fill: #4bd28b;
  &-cur {
    transition: 200ms;
    fill: #4bd28b;
    stroke: white;
    stroke-width: 2;
    cursor: pointer;
    display: none;
  }
}
</style>