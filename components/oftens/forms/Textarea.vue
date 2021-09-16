<template>
  <div class="textarea-wrapper">
    <label :for="id">{{ head }}</label>
    <textarea v-model.trim="textar"></textarea>
    <input :id="id" type="text" :value="textar" />
  </div>
</template>
<script>
export default {
  name: "Textarea",
  props: {
    head: String,
    id: String,
    value: String,
  },
  data: () => ({
    textar: "",
  }),
  created() {
    this.textar = this.value;
  },
};
</script>
<style scoped lang="scss">
.textarea-wrapper {
  position: relative;
  label {
    display: block;
    position: relative;
    min-height: 25px;
    margin-left: 1em;
  }
  textarea {
    width: 100%;
    height: 40px;
    padding: 0.75em 1em;
    border-radius: 0.25em;
    border: 1px solid #555d61;
    color: var(--color-white);
    background-color: var(--color-third);
    resize: vertical;
    min-width: 200px;
    max-height: 300px;
    min-height: 40px;
    overflow-y: auto;
    outline: none;
    -moz-appearance: none;
  }
  input {
    display: none;
  }
}
</style>