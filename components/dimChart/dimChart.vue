<template>
  <div class="chart">
    <div class="chart-head">
      <h4>График доходности</h4>
    </div>
    <div :class="['chart-wrapper', { 'chart-wrapper-empty': !serverData }]">
      <Yaxis :chart="chart" @yUpdates="furio" />
      <svg class="chart-graph">
        <Cell :chart="chart" />
        <Curve :chart="chart" :points="pointsPosition" />
        <Point :points="pointsPosition" @currentPoint="setCurrentPoint" />
      </svg>
      <Xaxis :chart="chart" :points="pointsPosition" />
    </div>
    <div id="pointCircle" class="point-circle">
      <strong class="point-circle-date">{{ currentPoint?.date }}</strong>
      <strong>{{ `Прибыльность:` }}</strong>
      <span>{{ currentPoint?.point }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cell from "@/components/dimChart/set/Cell";
import Point from "@/components/dimChart/set/Point";
import Curve from "@/components/dimChart/set/Curve";
import Yaxis from "@/components/dimChart/set/Yaxis";
import Xaxis from "@/components/dimChart/set/Xaxis";
export default {
  name: "dimChart",
  components: {
    Cell,
    Point,
    Curve,
    Yaxis,
    Xaxis,
  },
  props: {
    serverData: Array,
  },
  data: () => ({
    currentPoint: null,
    servPoints: [],
    chart: {
      height: 100,
      width: 100,
      max: 1,
      gap: 15,
      zero: function () {
        return this.height / 2;
      },
      gapWidth: function () {
        return this.width - this.gap * 2;
      },
      division: function () {
        return this.max / 2;
      },
    },
  }),
  computed: {
    ...mapGetters(["GET_WINDOW_WIDTH"]),
    pointsPosition() {
      return this.servPoints.map((item, index) => {
        let maxProcent = (item.point / this.chart.max) * 100;
        let zeroProcent = (this.chart.zero() * maxProcent) / 100;
        let xPos =
          index *
          (this.chart.width /
            (this.servPoints.length - 1 || this.servPoints[0].point));
        return {
          id: index + 1,
          xstep:
            this.chart.width /
            (this.servPoints.length - 1 || this.servPoints[0].point) /
            2,
          x:
            index == 0
              ? xPos + this.chart.gap
              : index == this.servPoints.length - 1
              ? xPos - this.chart.gap
              : xPos,
          y: this.chart.zero() - zeroProcent,
          date: item.date,
          legPoint: item.point,
        };
      });
    },
  },
  methods: {
    furio() {
      const graphWidth = document.querySelector(".chart-wrapper").clientWidth;
      const graphHeight = document.querySelector(".chart-graph").clientHeight;
      const offsetCurve = document.querySelector(".y-axis").offsetWidth;
      this.chart.width = graphWidth - offsetCurve;
      this.chart.height = graphHeight;
    },
    setCurrentPoint(arg) {
      this.currentPoint = arg;
    },
    setMax() {
      let counts = this.servPoints.map((item) => Math.abs(item.point));
      let maxCount = Math.max(...counts);
      let zeros = 1;
      if (maxCount < 1) {
        zeros /= 10;
        let afterDot = String(maxCount).slice(2);
        for (let i = 0; i < afterDot.length; i++) {
          if (Number(afterDot[i]) === 0) {
            zeros /= 10;
          } else {
            break;
          }
        }
        this.chart.max = maxCount + zeros;
      } else {
        let strMaxCount = String(maxCount);
        let beforeDot = strMaxCount.slice(0, strMaxCount.indexOf("."));
        for (let i = 1; i < beforeDot.length - 1; i++) {
          zeros *= 10;
        }
        this.chart.max = maxCount + zeros;
      }
    },
    updateGraph() {
      if (this.serverData) {
        this.servPoints = this.serverData.map((item) => {
          return {
            point: item.Profit,
            date: item.Date,
          };
        });
      } else {
        this.servPoints = [];
      }
    },
  },
  mounted() {
    this.furio();
  },
  watch: {
    serverData() {
      this.furio();
      this.updateGraph();
      this.setMax();
    },
    GET_WINDOW_WIDTH() {
      this.updateGraph();
      this.furio();
    },
  },
};
</script>

<style scoped lang="scss">
h4 {
  margin-top: 0;
}
.chart {
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
  position: relative;
  padding: 1em 2.4em 2em 2.4em;
  background-color: var(--color-second);
  border-radius: 15px;
  &-head {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-graph {
    height: 100%;
    width: 100%;
  }
}
.chart-wrapper {
  display: grid;
  height: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 50px;
  &-empty {
    opacity: 0.25;
  }
}
.point-circle {
  position: absolute;
  /* width: 120px;
  height: 60px; */
  flex-flow: column;
  padding: 5px 20px;
  background: #454f82;
  transition: 200ms;
  pointer-events: none;
  display: none;
  font-size: var(--fs-d3);
  &-date {
    font-size: var(--fs-d1);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 35px;
    border: 5px solid transparent;
    border-top: 5px solid #454f82;
  }
}
@media screen and (max-width: 992px) {
  .chart {
    padding: 1em 2em 2em 2em;
  }
}
</style>