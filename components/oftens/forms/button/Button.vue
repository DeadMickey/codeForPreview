<template>
  <button
    :class="[
      'button',
      { 'button-opacity': opacity },
      { 'button-bordered': bordered },
      { [`button-${color}`]: color },
      { [`button-text-${textColor}`]: textColor },
    ]"
    @mouseenter="hoverBgShow = true"
    @mouseleave="hoverBgShow = false"
  >
    <HoverBg v-if="hoverBgShow && !bordered && !opacity" />
    <i :class="[icon, 'button-icon']" v-if="icon"></i>
    <span class="button-text">{{ text }}</span>
  </button>
</template>
<script>
import HoverBg from "@/components/oftens/forms/button/HoverBg";
export default {
  name: "Button",
  components: { HoverBg },
  props: {
    text: String,
    color: String,
    textColor: String,
    opacity: Boolean,
    bordered: Boolean,
    icon: String,
  },
  data: () => ({
    hoverBgShow: false,
  }),
};
</script>
<style scoped lang="scss">
.button {
  position: relative;
  padding: 12px 15px;
  border: none;
  min-width: 120px;
  border-radius: 5px;
  transition: var(--transition);
  color: var(--color-white);
  background: var(--color-fourth);
  overflow: hidden;
  font-weight: 700;
  text-transform: uppercase;
  font-size: var(--fs-d3);
  &:hover {
    background: var(--color-fourth-hover);
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
  }
  &-icon,
  &-text {
    position: relative;
  }
  &-icon {
    margin-right: 0.35em;
    font-size: var(--fs);
  }
  &-red {
    background: var(--color-red);
    &:hover {
      background: var(--color-red-hover);
    }
  }
  &-text-red {
    color: var(--color-red-light);
  }
  &-green {
    background: #00a651;
    &:hover {
      background: rgb(51, 173, 106);
    }
  }
  &-text-green {
    color: #00a651;
  }
  &-blue {
    background: #21a9e1;
    &:hover {
      background: #2698c9;
    }
  }
  &-text-blue {
    color: #21a9e1;
  }
  &-orange {
    background: #ff9600;
    &:hover {
      background: #e48808;
    }
  }
  &-text-orange {
    color: #ff9600;
  }
}
.button-opacity {
  border-radius: 0em;
  background: #edf6f912;
  &:hover {
    background: #edf6f91c;
    box-shadow: none;
    transform: none;
  }
}
.button-bordered {
  background: transparent;
  border: 0.1em solid var(--color-white);
  &:hover {
    background: #edf6f912;
  }
}
@media screen and (max-width: 576px) {
  .button {
    min-width: initial;
  }
}
</style>