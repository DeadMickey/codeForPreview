<template>
  <div class="setting-wrapper">
    <label v-if="head" :for="id" class="label">{{ head }}</label>
    <input
      class="setting"
      :id="id"
      :value="value"
      :type="type ?? defaultType"
      :placeholder="placeholder ?? type ?? `${typeof value}`"
    />
  </div>
</template>
<script>
import inputMix from "@/mixins/inputMix.js";
export default {
  name: "Setting",
  mixins: [inputMix],
  props: { value: [String, Number, Boolean] },
  computed: {
    defaultType() {
      return typeof this.value == "number" ? "number" : "text";
    },
  },
};
</script>
<style scoped lang="scss">
.setting-wrapper {
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  min-height: 35px;
}
.label {
  white-space: initial;
  text-overflow: ellipsis;
}
.setting {
  font-size: var(--fs-d2);
  min-height: 35px;
  border-radius: 0.25em;
  padding-right: 0.5em;
  max-width: 100px;
  border: 0;
  text-align: right;
  text-indent: 1em;
  color: var(--color-white);
  background-color: transparent;
  &:focus {
    outline: none;
    background-color: var(--color-second);
    box-shadow: 0 0 0 1px #555d61;
  }
  &::placeholder {
    color: currentColor;
    opacity: 0.5;
  }
}
.setting[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>