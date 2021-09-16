<template>
  <div class="radioboxes">
    <div class="radiobox" v-for="box in boxObjects" :key="box.val">
      <label :for="`${name}-${box.val}`">
        <input
          type="radio"
          :id="`${name}-${box.val}`"
          :name="name"
          :value="box.val"
          v-model="picked"
        />
        <div class="radiobox-custom">
          <div
            :class="[
              'radiobox-custom-item',
              { 'radiobox-custom-item-on': box.val == picked },
            ]"
          ></div>
        </div>
        <span>{{ box.txt }}</span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: "Radioboxes",
  props: {
    boxObjects: Array,
    name: String,
    checked: [Number, String],
  },
  data: () => ({
    picked: null,
  }),
  watch: {
    picked() {
      this.$emit("radioVal", this.picked);
    },
  },
  created() {
    this.picked = this.checked;
  },
};
</script>
<style scoped lang="scss">
.radiobox {
  &-custom {
    position: relative;
    width: 14px;
    height: 14px;
    margin-right: 0.75em;
    border-radius: 50%;
    overflow: hidden;
    background: var(--color-white);
    &-item {
      position: absolute;
      height: 10px;
      width: 0px;
      top: 2px;
      right: 0;
      border-radius: inherit;
      transition: 200ms;
      background-color: var(--color-fourth);
      &-on {
        left: 2px;
        width: 10px;
      }
    }
  }
  label {
    display: flex;
    //align-items: center;
    user-select: none;
    cursor: pointer;
  }
  input {
    display: none;
  }
}
</style>