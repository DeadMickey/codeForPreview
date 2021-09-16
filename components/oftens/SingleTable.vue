<template>
  <table class="table">
    <thead>
      <tr class="head-tr">
        <th v-for="th in ths" :key="th" class="th">{{ th }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="tds">
        <tr v-for="tr in tds.slice().reverse()" :key="tr.id">
          <template v-for="(td, k) in tr" :key="td.id">
            <td class="td" v-if="k != 'id'">
              <div class="td-item">
                {{ td }}
              </div>
            </td>
          </template>
        </tr>
      </template>
      <template v-else>
        <EmptyTableShow />
      </template>
    </tbody>
  </table>
</template>
<script>
import EmptyTableShow from "@/components/oftens/EmptyTableShow";
export default {
  name: "SingleTable",
  props: {
    ths: [Array, Object],
    tds: [Array, Object],
  },
  components: { EmptyTableShow },
};
</script>
<style scoped lang="scss">
.table {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fs-d1);
  text-align: center;
  .td,
  .th {
    padding: 1em 0.5em;
  }
  .td {
    max-width: 200px;
    &-item {
      max-height: 80px;
      overflow-y: auto;
    }
  }
}
.head-tr {
  position: sticky;
  top: 0;
  background-color: var(--color-third);
}
.empty-table {
  position: absolute;
  width: 100%;
  height: 500px;
  padding-top: 100px;
}
@media screen and (max-width: 1200px) {
  .empty-table {
    height: 300px;
    padding-top: 50px;
  }
}
</style>