<template>
  <div class="calendar-page">
    <div class="calendar-info">
      <span>{{ `${monthNames[xmt]} ${xyr}` }}</span>
    </div>
    <div class="calendar-weeks">
      <span class="weekday" v-for="name in daysNames" :key="name">{{
        name
      }}</span>
      <span
        v-for="el in daysInPage"
        :class="[
          'day-number',
          { 'd-clicked': range.includes(el.text) && !el.sideMonth },
          { 'd-hover': fff(el.text, el.sideMonth) ?? current == el.text },
          { 'd-outside': el.sideMonth },
        ]"
        :key="el.id"
        @click="datePick(el.sideMonth, el.text)"
        @mouseover="hoverEl(el.sideMonth, el.text)"
      >
        {{ el.day }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "CalendarPage",
  data: () => ({
    daysNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  }),
  props: {
    year: Number,
    month: Number,
    monthNames: Array,
    range: Array,
    current: String,
  },
  computed: {
    xyr() {
      return new Date(this.year, this.month).getFullYear();
    },
    xmt() {
      return new Date(this.year, this.month).getMonth();
    },
    fillPage() {
      let fillArray = [];
      let newDate = new Date(this.year, this.month);
      // Решение создать копию, не повышаю дату (пересмотреть потом, работает но не красивый код)
      let newDate2 = new Date(this.year, this.month);
      // Наполнение числами вне месяца "До"
      for (let i = 0; i < this.getDimDay(newDate); i++) {
        fillArray.push(0);
      }
      // Наполнение числами текущего месяца
      while (newDate.getMonth() == newDate2.getMonth()) {
        fillArray.push(newDate.getDate());
        // Как раз дата каторая повышается, и в итоге становится не равна копии
        newDate.setDate(newDate.getDate() + 1);
      }
      // Наполнение числами вне месяца "После"
      if (this.getDimDay(newDate)) {
        for (let i = this.getDimDay(newDate); i < 7; i++) {
          fillArray.push("");
        }
      }
      return fillArray;
    },
    daysInPage() {
      let starting = -this.fillPage.filter((item) => item === 0).length + 1;
      return this.fillPage.map((el, i) => {
        let formating = "";
        formating = JSON.parse(
          JSON.stringify(new Date(this.year, this.month, ++starting))
        ).substr(0, 10);
        return {
          id: i,
          day: Number(formating.substr(-2, 2)),
          /*
          прежний вариант - работал только на конкретный год (Разобраться потом)
          sideMonth:
           !(Number(formating.substr(-5, 2)) !== this.xmt &&
            Number(formating.substr(-5, 2)) !== this.xmt + 2),
          */
          sideMonth:
            Number(formating.substr(-5, 2)) !== this.xmt + 1 &&
            Number(formating.substr(-5, 2)) !== this.xmt + 3,
          hover: false,
          text: formating,
        };
      });
    },
  },
  methods: {
    fff(ttt, ddd) {
      if (this.range.length == 1) {
        return (
          (this.range[0] <= ttt && ttt <= this.current && !ddd) ||
          (this.range[0] >= ttt && ttt >= this.current && !ddd)
        );
      } else if (this.range.length == 2) {
        return (
          (this.range[0] < ttt && ttt < this.range[1] && !ddd) ||
          (this.range[0] > ttt && ttt > this.range[1] && !ddd)
        );
      }
    },
    datePick(isSide, text) {
      if (!isSide) {
        this.$emit("rng", text);
      }
    },
    hoverEl(isSide, text) {
      if (!isSide) {
        this.$emit("hov", text);
      }
    },
    getDimDay(date) {
      let day = date.getDay();
      if (!day) day = 7;
      return day - 1;
    },
  },
};
</script>
<style scoped lang="scss">
.calendar-page {
  font-size: var(--fs-d3);
}
.calendar-info {
  padding: 0.5em 0;
}
.calendar-weeks {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 0.15em;
}
.weekday {
  padding: 0.75em;
  background-color: rgba(255, 255, 255, 0.1);
  user-select: none;
}
.day-number {
  padding: 0.75em;
  background-color: rgba(255, 255, 255, 0.025);
  cursor: pointer;
  user-select: none;
  transition: background 222ms;
}
.d-hover {
  background-color: rgba(37, 170, 70, 0.205);
}
.d-clicked {
  background-color: rgb(37, 170, 70);
}
.d-outside {
  color: rgb(255, 255, 255, 0.25);
}
</style>