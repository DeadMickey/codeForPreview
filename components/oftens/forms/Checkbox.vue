<template>
  <div class="checkbox">
    <label class="checkbox-wrapper" :id="id">
      <span>{{ head }}</span>
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="sendInputValue"
      />
      <div
        :class="['checkbox-custom', { 'checkbox-custom-checked': modelValue }]"
      >
        <transition appear name="shotring">
          <div v-if="modelValue" class="shtor"></div>
        </transition>
        <i v-if="modelValue" class="fas fa-check icon"></i>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: "Checkbox",
  props: {
    head: String,
    id: String,
    modelValue: [Number, Boolean],
  },
  methods: {
    sendInputValue(e) {
      this.$emit("update:modelValue", e.target.checked);
    },
  },
};
</script>
<style scoped lang="scss">
.checkbox {
  position: relative;
  &-wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  &-custom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 8px;
    border: 1px solid #555d61;
    background-color: var(--color-third);
    overflow: hidden;
    transition: var(--transition);
    &-checked {
      transition: none;
      background-color: var(--color-fourth);
    }
  }
  & label {
    user-select: none;
  }
  & input {
    display: none;
  }
  & input,
  & label {
    cursor: pointer;
  }
}
.shtor {
  position: absolute;
  left: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-fourth);
  &-out {
    left: 100%;
  }
}
.shotring-enter-active {
  transition: 0.5s ease;
}

.shotring-enter-from {
  left: 0;
}
</style>