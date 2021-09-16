<template>
  <div
    :class="['calendar', { 'calendar-show': calendarShow }]"
    v-clickOut="() => $emit('calendarOff')"
  >
    <div class="calendar-head">
      <div class="swap-icon" @click="swap(1)">
        <i class="fal fa-chevron-left"></i>
      </div>
      <div class="calendar-range">
        <span
          v-if="GET_WINDOW_WIDTH > 992"
          :class="['minus', { 'minus-disabled': pages.length == 2 }]"
          @click="monthRebuild('minus')"
        >
          <i class="fal fa-calendar-minus"></i>
        </span>
        <span>
          {{ "Выбранный диапозон:" }}<br />{{
            `${defaultRange[0] ?? range[0] ?? "Не выбрано"} - ${
              defaultRange[1] ?? range[1] ?? "Не выбрано"
            }`
          }}
        </span>
        <span
          v-if="GET_WINDOW_WIDTH > 992"
          :class="['plus', { 'plus-disabled': pages.length == 6 }]"
          @click="monthRebuild('plus')"
        >
          <i class="fal fa-calendar-plus"></i>
        </span>
      </div>
      <div class="swap-icon" @click="swap()">
        <i class="fal fa-chevron-right"></i>
      </div>
    </div>
    <div class="calendar-pages" :style="colCount">
      <template v-for="number in pages" :key="number">
        <CalendarPage
          :year="year"
          :month="month - number"
          @rng="rangeControl"
          @hov="hov"
          :range="!range.length ? defaultRange : range"
          :current="current"
          :monthNames="monthNames"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CalendarPage from "@/components/oftens/dimCalendar/CalendarPage";
export default {
  name: "Calendar",
  components: { CalendarPage },
  props: {
    defaultRange: Array,
    calendarShow: Boolean,
  },
  data: () => ({
    dateNow: new Date(),
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    pages: [1, 0],
    range: [],
    current: "",
    asdf: 0,
  }),
  watch: {
    range() {
      this.$emit("rangeChanged", this.range);
    },
    GET_WINDOW_WIDTH() {
      this.mounthControl();
    },
  },
  computed: {
    ...mapGetters(["GET_WINDOW_WIDTH"]),
    year() {
      return this.dateNow.getFullYear();
    },
    month() {
      return this.dateNow.getMonth() - this.asdf;
    },
    colCount() {
      let num = this.pages.length >= 3 ? 3 : 2;
      return {
        "grid-template-columns":
          this.GET_WINDOW_WIDTH <= 576 ? "240px" : `repeat(${num}, 240px)`,
      };
    },
  },
  methods: {
    monthRebuild(way) {
      if (way === "plus" && this.pages.length < 6) {
        this.pages.unshift(Math.max(...this.pages) + 1);
      } else if (this.pages.length > 2 && way === "minus") {
        this.pages.shift();
      }
    },
    hov(xxx) {
      this.current = xxx;
    },
    swap(back) {
      if (back) {
        ++this.asdf;
      } else {
        --this.asdf;
      }

      //this.pages = this.pages.map((el) => (back ? ++el : --el));
    },
    rangeControl(rngDate) {
      if (this.range.length > 1) {
        this.range.length = 0;
      }
      this.range.push(rngDate);
      this.range = this.range.map((el) => el.substr(0, 10));
      this.range.sort((a, b) => {
        return a > b ? 1 : -1;
      });
    },
    mounthControl() {
      if (this.GET_WINDOW_WIDTH > 576 && this.GET_WINDOW_WIDTH <= 992) {
        this.pages = [1, 0];
      } else if (this.GET_WINDOW_WIDTH <= 576) {
        this.pages = [0];
      }
    },
  },
  mounted() {
    this.mounthControl();
  },
};
</script>
<style scoped lang="scss">
.calendar {
  position: absolute;
  background-color: var(--color-second);
  padding: 20px;
  z-index: 5;
  display: none;
  box-shadow: 0 0 50px -10px #00000091;
  &-show {
    display: block;
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-range {
    display: flex;
    text-align: center;
    font-size: var(--fs-d2);
    align-items: center;
    column-gap: 10px;
    user-select: none;
    .minus,
    .plus {
      width: 20px;
      height: 20px;
      cursor: pointer;
      font-size: var(--fs-x2);
      &-disabled {
        opacity: 0.25;
        cursor: default;
      }
    }
  }
  &-pages {
    display: grid;
    gap: 20px;
    text-align: center;
    //justify-content: center;
  }
}
.swap-icon {
  //background-color: red;
  padding: 0.25em 0.75em;
  cursor: pointer;
}
@media screen and (max-width: 992px) {
  .calendar {
    &-pages {
      justify-content: center;
    }
  }
}
</style>