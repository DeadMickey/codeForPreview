<template>
  <transition appear name="tool">
    <div
      :class="['tooltip', `tooltip-${GET_TOOLTIP.side}`]"
      :style="[toolTipStyle, `transition-delay: ${GET_TOOLTIP.delay}ms`]"
    >
      <span>{{ GET_TOOLTIP.text }}</span>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Tooltip",
  data: () => ({
    defaultOffset: 20,
    toolProperties: {
      width: 0,
      height: 0,
    },
  }),
  computed: {
    ...mapGetters(["GET_TOOLTIP"]),
    toolMount() {
      return this.toolProperties.width || this.toolProperties.height;
    },
    toolTipStyle() {
      if (this.toolMount) {
        let defaultX = this.GET_TOOLTIP.x - this.toolProperties.width;
        let defaultY = this.GET_TOOLTIP.y - this.toolProperties.height;
        switch (this.GET_TOOLTIP.side) {
          case "top":
            return {
              left: `${
                defaultX +
                this.toolProperties.width / 2 +
                this.GET_TOOLTIP.width / 2
              }px`,
              top: `${defaultY - this.defaultOffset}px`,
            };
          case "right":
            return {
              left: `${
                defaultX +
                this.toolProperties.width +
                this.GET_TOOLTIP.width +
                this.defaultOffset
              }px`,
              top: `${
                defaultY +
                this.toolProperties.height / 2 +
                this.GET_TOOLTIP.height / 2
              }px`,
            };
          case "bottom":
            return {
              left: `${
                defaultX +
                this.toolProperties.width / 2 +
                this.GET_TOOLTIP.width / 2
              }px`,
              top: `${
                defaultY +
                this.toolProperties.height +
                this.GET_TOOLTIP.height +
                this.defaultOffset
              }px`,
            };
          case "left":
            return {
              left: `${defaultX - this.defaultOffset}px`,
              top: `${
                defaultY +
                this.toolProperties.height / 2 +
                this.GET_TOOLTIP.height / 2
              }px`,
            };
          default:
            return false;
        }
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.toolProperties.width = this.$el.clientWidth;
    this.toolProperties.height = this.$el.clientHeight;
  },
};
</script>
<style scoped lang="scss">
$color: rgb(47, 98, 146);

.tooltip {
  position: fixed;
  padding: 10px 20px;
  max-width: 350px;
  background-color: $color;
  z-index: 20;
  &-top,
  &-right,
  &-bottom,
  &-left {
    &::after {
      content: "";
      display: block;
      position: absolute;
      border: 10px solid transparent;
    }
  }
  &-top {
    &::after {
      bottom: -20px;
      left: calc(50% - 10px);
      border-top: 10px solid $color;
    }
  }
  &-right {
    &::after {
      top: calc(50% - 10px);
      left: -20px;
      border-right: 10px solid $color;
    }
  }
  &-bottom {
    &::after {
      top: -20px;
      left: calc(50% - 10px);
      border-bottom: 10px solid $color;
    }
  }
  &-left {
    &::after {
      top: calc(50% - 10px);
      right: -20px;
      border-left: 10px solid $color;
    }
  }
}
.tool-enter-active {
  transition: opacity 300ms ease;
}

.tool-enter-from {
  opacity: 0;
}
</style>