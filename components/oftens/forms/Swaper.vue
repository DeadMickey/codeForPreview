<template>
  <div class="swaper-wrapper" @click="swap">
    <label v-if="head" class="label">{{ head }}</label>
    <div v-if="!mod" :class="['swaper', { 'swaper-on': swaperOn }]">
      <div class="swaper-slider"></div>
    </div>
    <div v-else class="swaper-bool">{{ swaperOn == "AND" ? "И" : "ИЛИ" }}</div>
    <input :id="id" type="number" :value="swaperOn" class="input" />
  </div>
</template>
<script>
export default {
  name: "Swaper",
  props: {
    id: String,
    value: [String, Number, Boolean],
    head: String,
    mod: String,
  },
  data: () => ({
    swaperOn: null,
  }),
  created() {
    if (!this.mod) {
      this.swaperOn = +this.value ? 1 : 0;
    } else {
      this.swaperOn = this.value == "AND" ? "AND" : "OR";
    }
  },
  methods: {
    swap() {
      if (!this.mod) {
        this.swaperOn = this.swaperOn ? 0 : 1;
      } else {
        this.swaperOn = this.swaperOn == "AND" ? "OR" : "AND";
      }
    },
  },
  watch: {
    swaperOn() {
      this.$emit("swaperTick", this.swaperOn);
    },
  },
};
</script>
<style scoped lang="scss">
.swaper-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 45px;
  column-gap: 0.5em;
  cursor: pointer;
}
.label {
  white-space: initial;
  text-overflow: ellipsis;
}
.swaper {
  position: relative;
  width: 25px;
  height: 5px;
  background-color: var(--color-white);
  transition: var(--transition);
  &-slider {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    top: -3px;
    left: -3px;
    background-color: var(--color-white);
    transition: var(--transition);
  }
  &-bool {
    //background: #18d2b3;
    font-style: italic;
    user-select: none;
  }
  &-on {
    background-color: #18d2b3;
    .swaper-slider {
      left: 75%;
      background-color: #18d2b3;
    }
  }
}
input {
  display: none;
}
</style>