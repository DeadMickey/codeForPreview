<template>
  <div class="input-wrapper">
    <div class="input-msg" v-if="error">
      <span>{{ error }}</span>
    </div>
    <label v-if="head" :for="id" class="label">{{ head }} </label>
    <i v-if="icon" :class="[icon, 'input-wrapper-icon']" :style="iconStyle"></i>
    <input
      :value="modelValue"
      @[action]="sendOutside($event)"
      :class="['input', { 'input-error': erBorder }]"
      :id="id"
      :type="type ?? defaultType"
      :placeholder="placeholder ?? type ?? `${typeof modelValue}`"
      :style="inputStyle"
    />
  </div>
</template>
<script>
import inputMix from "@/mixins/inputMix.js";
export default {
  name: "Input",
  mixins: [inputMix],
  emits: ["update:modelValue", "stopError"],
  props: {
    icon: String,
    error: String,
    erBorder: Boolean,
    date: Boolean,
    modelValue: [String, Number],
    modelModifiers: {
      default: () => ({}),
    },
  },
  computed: {
    action() {
      return this.modelModifiers.lazy ? "change" : "input";
    },
    inputStyle() {
      return {
        textIndent: this.icon ? "3.5em" : "1.5em",
      };
    },
    iconStyle() {
      return {
        top: this.head ? "60%" : "calc(50% - 9px)",
      };
    },
    defaultType() {
      return typeof this.modelValue == "number" ? "number" : "text";
    },
  },
  methods: {
    sendOutside(e) {
      let sendVal;
      if (this.date) {
        sendVal = e.target.value.replace(/[^\d^-]/g, "");
        e.target.value = sendVal;
      } else {
        sendVal = e.target.value;
      }
      this.$emit("update:modelValue", sendVal);
    },
  },
};
</script>
<style scoped lang="scss">
.input-wrapper {
  position: relative;
  .label {
    display: block;
    position: relative;
    min-height: 25px;
    max-width: 100%;
    overflow: hidden;
  }
  .input {
    font-size: var(--fs-d2);
    width: 100%;
    height: 40px;
    border-radius: 0.25em;
    padding-right: 5px;
    border: 1px solid #555d619a;
    color: var(--color-white);
    background-color: var(--color-third);
    transition: var(--transition);
    &-error {
      //border-color: #e22f47c1;
      background-color: #472b2f;
    }
    &:focus {
      outline: none;
      border-color: #7d878b83;
    }
    &::placeholder {
      color: currentColor;
      opacity: 0.5;
    }
  }
  &-icon {
    position: absolute;
    font-size: var(--fs);
    left: 15px;
    transition: 250ms;
  }
  &:hover &-icon {
    opacity: 0.7;
  }
  &-big .input {
    height: 50px;
  }
}
.input-msg {
  position: absolute;
  top: -30px;
  width: 100%;
  padding: 0.15em 1em;
  border-radius: 0.25em;
  border: 1px solid #555d61;
  background-color: #e22f47;
}
@import "@/assets/q-media/qInput.scss";
</style>