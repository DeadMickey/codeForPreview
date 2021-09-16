<template>
  <transition name="pageUp">
    <div class="page-up" @click="scrollTopAnimate" v-if="GET_SCROLL_TOP > 2000">
      <span>Прокрутить вверх</span>
      <div class="up-icon">
        <i class="fal fa-arrow-up"></i>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ScrollToTop",
  computed: {
    ...mapGetters(["GET_SCROLL_TOP"]),
  },
  methods: {
    scrollTopAnimate() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped lang="scss">
.page-up {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 200px;
  bottom: 25px;
  left: calc(50% - 100px);
  padding: 10px 20px;
  opacity: 0.25;
  background-color: var(--color-fourth);
  transition: var(--transition);
  border-radius: 5px;
  z-index: 10;
  user-select: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
    box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.75);
  }
}
.up-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.2);
}
.pageUp-enter-active,
.pageUp-leave-active {
  transition: 0.5s ease;
}

.pageUp-enter-from,
.pageUp-leave-to {
  transform: translateY(200px);
}
</style>