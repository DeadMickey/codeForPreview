<template>
  <div class="select-wrapper" @click.stop="isOpen = !isOpen">
    <label>{{ head }}</label>
    <div class="custom-select">
      <span>{{ placeHolder }}</span>
      <i :class="['icon', 'fal', icon]"></i>
      <transition name="option">
        <div v-show="isOpen" class="options" v-clickOut="closeOptons">
          <span
            v-for="(item, i) in replacer ?? options"
            :key="item"
            class="option"
            :data-val="item"
            @click.stop="swapOption($event, item, i)"
          >
            {{ item }}
          </span>
        </div>
      </transition>
    </div>
    <input
      :id="id"
      type="hidden"
      :value="withoutV_Model"
      v-if="options"
    />
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    head: String,
    id: String,
    options: Array,
    value: [String, Number],
    stringType: Boolean,
    replacer: Array,
  },
  data: () => ({
    placeHolder: null,
    withoutV_Model: null,
    isOpen: false,
    icon: "fa-chevron-down",
  }),
  methods: {
    closeOptons() {
      this.isOpen = false;
    },
    swapOption({ target }, item, index) {
      this.placeHolder = target.textContent;
      if (this.replacer) {
        this.withoutV_Model = this.options[index];
      } else {
        this.withoutV_Model = this.stringType
          ? item
          : this.options.indexOf(item);
      }
      this.closeOptons();
    },
  },
  created() {
    if (this.replacer) {
      this.placeHolder = this.replacer[this.options.indexOf(this.value)];
    } else {
      this.placeHolder = this.stringType
        ? this.value
        : this.options[this.value];
    }
    this.withoutV_Model = this.value;
    //this.placeHolder = this.value;
  },
  mounted() {
    if (this.$el.classList.contains("choiser")) {
      this.icon = "fa-ellipsis-v";
    }
  },
};
</script>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  min-height: 40px;
  label {
    display: block;
    position: relative;
    min-height: 25px;
    cursor: pointer;
  }
}
.custom-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 100px;
  height: 40px;
  padding: 0.75em 1em;
  border-radius: 0.25em;
  border: 1px solid #555d619a;
  color: var(--color-white);
  background-color: var(--color-third);
  cursor: pointer;
  font-style: italic;
}
.options {
  position: absolute;
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 1em 1.5em;
  top: 105%;
  border-radius: 1em;
  left: 0;
  background: var(--color-third);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  z-index: 5;
}
.option {
  padding: 0.5em;
  position: relative;
  padding-left: 10px;
  user-select: none;
  transition: 250ms;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 12.5px);
    left: 0;
    width: 0px;
    height: 25px;
    background-color: #3172c7;
    transition: 250ms;
    clip-path: polygon(0 30%, 0 70%, 85% 50%);
  }
  &:hover {
    color: #3172c7;
    padding-left: 15px;
  }
  &:hover::before {
    width: 4px;
  }
}
.option-enter-active,
.option-leave-active {
  transition: opacity 150ms ease, transform 200ms ease;
}

.option-enter-from,
.option-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}
.choiser {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 35px;
  padding-left: 0.75em;
  .custom-select {
    justify-content: flex-end;
    column-gap: 0.5em;
    height: 35px;
    flex: 0 1 200px;
    padding: 0.75em 1em;
    border-radius: 0.25em;
    border: 0;
    color: var(--color-white);
    background-color: var(--color-third);
    cursor: pointer;
  }
  .icon {
    font-size: var(--fs-x2);
  }
  & label {
    flex: 1 1 300px;
    min-height: 0;
    margin-left: 0;
    white-space: initial;
    text-overflow: ellipsis;
  }
}
</style>