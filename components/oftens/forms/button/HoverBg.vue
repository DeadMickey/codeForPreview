<template>
  <div class="hover-bg">
    <HoverBgPart
      v-for="part in parts"
      :key="part.id"
      @partWayEnd="partDelete(part.id)"
    ></HoverBgPart>
  </div>
</template>
<script>
import { randomInt, randomFloat } from "@/mixins/_global";
import HoverBgPart from "@/components/oftens/forms/button/HoverBgPart";
export default {
  name: "HoverBg",
  components: { HoverBgPart },
  data: () => ({
    parts: [],
  }),
  methods: {
    partDelete(id) {
      let partIndex = this.parts.findIndex((el) => el.id === id);
      this.parts.splice(partIndex, 1);
    },
    addParts() {
      for (let i = 0; i < randomInt(4, 12); i++) {
        this.parts.push({
          id: i + randomFloat(0, 1000000),
        });
      }
    },
  },
  created() {
    this.addParts();
    setInterval(() => this.addParts(), 1000);
  },
};
</script>
<style scoped lang="scss">
.hover-bg {
  position: absolute;
  top: -50px;
  bottom: -50px;
  left: -25px;
  right: -25px;
  z-index: 0;
  overflow: hidden;
  //background-color: red;
}
</style>