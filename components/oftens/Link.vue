<template>
  <a :href="refto ?? '#'" @click="defBehavior" class="link">
    <i
      v-if="!noIcon"
      :class="[`${icon ?? 'fal fa-external-link'}`, 'link-icon']"
    ></i>
    <span>{{ text }}</span>
  </a>
</template>
<script>
export default {
  name: "Link",
  props: {
    text: String,
    refto: String,
    icon: String,
    noIcon: Boolean,
  },
  methods: {
    defBehavior(e) {
      if (!this.refto) {
        e.preventDefault();
      }
    },
  },
};
</script>
<style scoped lang="scss">
.link {
  display: inline-block;
  color: #e0c474;
  font-weight: 400;
  font-style: italic;
  text-decoration: none;
  &-icon {
    margin-right: 0.25em;
  }
  &:hover {
    color: #e7dab7;
  }
}
</style>