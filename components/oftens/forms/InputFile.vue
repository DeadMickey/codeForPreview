<template>
  <div class="input-wrapper">
    <label v-bind="upload" v-if="head" :for="id" class="label-upload">
      <span>{{ head }}</span>
    </label>
    <i v-if="icon" :class="[icon, 'input-wrapper-icon']" :style="iconStyle"></i>
    <input
      class="input"
      :id="id"
      type="file"
      :style="inputStyle"
      @change="loadFileName"
    />
  </div>
</template>
<script>
export default {
  name: "InputFile",
  props: {
    id: String,
    head: String,
    icon: String,
    placeholder: String,
  },
  data: () => ({
    upload: {
      "data-file": null,
    },
  }),
  computed: {
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
  },
  methods: {
    loadFileName() {
      let fileInput = this.$el.querySelector("input");
      let file = fileInput.files[0];
      let fileName = file.name;

      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.upload["data-file"] = fileName;
        this.$emit("fileUploaded", fileName, reader.result);
      };
    },
  },
  created() {
    this.upload["data-file"] = this.placeholder;
  },
};
</script>
<style scoped lang="scss">
.input-wrapper {
  position: relative;
  .label-upload {
    display: block;
    position: relative;
    min-height: 25px;
    max-width: 100%;
    overflow: hidden;
    cursor: pointer;
    &::after {
      content: attr(data-file);
      text-indent: 40px;
      line-height: 40px;
      display: block;
      margin-top: 0.7em;
      height: 40px;
      box-sizing: border-box;
      border-radius: 0.25em;
      color: #889297;
      background-color: var(--color-third);
      border: 1px solid #555d619a;
      font-size: var(--fs-d2);
    }
  }
  .input {
    display: none;
  }
  &-icon {
    position: absolute;
    font-size: var(--fs);
    left: 15px;
    transition: 250ms;
    color: #e2deeb;
  }
  &:hover &-icon {
    opacity: 0.7;
  }
}
</style>