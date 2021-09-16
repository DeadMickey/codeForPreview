<template>
  <div class="tabs-panel">
    <input class="hide-input" type="hidden" :value="hideval" :id="hideid" />
    <div class="tabs-panel-swaper">
      <span
        v-for="(name, i) in tabsName"
        :key="name"
        @click="setTab(i)"
        :class="{ active: i == showTab }"
        >{{ name }}</span
      >
    </div>
    <template v-for="(item, i) in tabsName" :key="'item' + i">
      <div :id="`tab-${i + 1}`" class="tab" v-if="i == showTab">
        <slot :name="`slot-${i + 1}`"></slot>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "TabPanel",
  props: {
    tabsName: Array,
    hideval: Number,
    hideid: String,
  },
  data: () => ({
    showTab: null,
  }),
  methods: {
    setTab(index) {
      this.showTab = index;
    },
  },
  created() {
    this.showTab = this.hideval;
  },
  updated() {
    this.$el.querySelector(".hide-input").value = this.showTab;
  },
};
</script>
<style scoped lang="scss">
.tabs-panel {
  margin-top: 1em;
  &-swaper {
    position: relative;
    span {
      height: 100%;
      display: inline-block;
      padding: 0.5em;
      cursor: pointer;
      user-select: none;
      opacity: 0.5;
    }
    .active {
      opacity: 1;
    }
  }
}

.tab {
  &::v-deep(.setting-wrapper),
  &::v-deep(.select-wrapper) {
    opacity: 0;
    transform: translateY(25px);
    animation: test 500ms ease both;
    z-index: 1;
  }
}
@for $i from 1 to 10 {
  .tab::v-deep(.setting-wrapper):nth-child(#{$i}),
  .tab::v-deep(.select-wrapper):nth-child(#{$i}) {
    animation-delay: #{$i * 0.05}s;
  }
}
@keyframes test {
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>