<template>
  <div class="alerts-wrapper" v-if="GET_ALERTS.length > 0">
    <transition-group name="alrt">
      <div
        v-for="(alert, i) in GET_ALERTS"
        :key="alert"
        :class="['alert', `alert-${alert.type}`]"
      >
        <div class="alert-head">
          <h4>{{ alert.head ?? headBuf(alert.type) }}</h4>
          <i class="fal fa-times alert-close" @click="DELETE_ALERT(i)"></i>
        </div>
        <div class="alert-body">
          {{ alert.msg }}
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Alerts",
  computed: {
    ...mapGetters(["GET_ALERTS"]),
  },
  methods: {
    ...mapActions(["DELETE_ALERT"]),
    headBuf(type) {
      switch (type) {
        case "error":
          return "Ошибка";
        case "success":
          return "Успешно";
        case "info":
          return "Информация";
        case "warning":
          return "Предупреждение";
        case "default":
          return "Системное сообщение";
        default:
          return "Неожиданное сообщение";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.alerts-wrapper {
  position: fixed;
  //width: 500px;
  min-height: 100px;
  //background: rgb(84, 149, 218);
  z-index: 100;
  right: 0px;
  padding: 0 2em;
  top: 90px;
}
.alert {
  padding: 1.25em;
  color: white;
  margin-top: 10px;
  border-radius: 0.25em;
  transition: 333ms;
  width: 500px;
  h4 {
    margin: 0;
  }
  &-head {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1em solid;
  }
  &-body {
    margin-top: 1.25em;
  }
  &-close {
    cursor: pointer;
  }
  &-default {
    background: var(--color-white);
    color: black;
  }
  &-error {
    background: rgb(220, 56, 56);
  }
  &-success {
    background: rgb(73, 150, 73);
  }
  &-warning {
    background: #daa203;
  }
  &-info {
    background: rgb(48, 100, 150);
  }
}
.alrt-enter-from,
.alrt-leave-to {
  opacity: 0;
}
.alrt-leave-to {
  transform: translateX(100px);
}
.alrt-enter-to {
  transform: translateY(30px);
}
.alrt-leave-active {
  position: absolute;
}
.alrt-move {
  transition: 500ms;
}
@import "@/assets/q-media/qAlerts.scss";
</style>