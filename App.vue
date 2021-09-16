<template>
  <LoadingPage v-if="GET_LOGIN_USER" />
  <transition appear name="login-swap" mode="out-in">
    <div class="login-part" v-if="GET_LOGIN_USER">
      <Header />
      <Main />
    </div>
    <div class="alien-part" v-else>
      <StartPage />
    </div>
  </transition>
</template>
<script>
import { GIP } from "@/mixins/_global";
import { mapActions, mapGetters } from "vuex";
import LoadingPage from "@/components/LoadingPage";
import StartPage from "@/components/StartPage";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
export default {
  name: "App",
  components: {
    LoadingPage,
    StartPage,
    Header,
    Main,
  },
  computed: {
    ...mapGetters(["GET_LOGIN_USER"]),
  },
  methods: {
    ...mapActions([
      "SET_USER",
      "SET_SCROLL_TOP",
      "SET_WINDOW_WIDTH",
      "SET_TEMPLATES_LIST",
    ]),
  },
  created() {
    fetch(`${GIP}/api/v2/get_current_user/`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((ans) => {
        if (ans.data) {
          this.SET_USER(ans.data);
          this.SET_TEMPLATES_LIST();
        }
      });
  },
  mounted() {
    window.onscroll = () => {
      this.SET_SCROLL_TOP();
    };
    window.onresize = () => {
      this.SET_WINDOW_WIDTH();
    };
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");
@import url("assets/fontawesome/all.min.css");

#templatebot {
  /* Colors */
  --color-first: #292e3f;
  --color-second: #1e222f;
  --color-third: #232837;
  --color-fourth: #454f82;
  --color-fourth-hover: #3f4a85;
  --color-fifth: #f9fc36;
  --color-white: #eaebf2;
  --color-red: #d03030;
  --color-red-hover: rgb(202, 59, 59);
  --color-red-light: #ea5f5f;
  /*
    --color-first: #2f3d46;
    --color-second: #1f2c33;
    --color-third: #2a363e;
    --color-fourth: #008dd5;
    --color-fourth-hover: #007ab8;
    --color-fifth: #e4d72a;
    --color-white: #edf6f9;
  */
  /* Commons */
  --header-height: 80px;
  --header-min-height: 60px;
  --transition: 250ms;
  /* Font Size */
  --fs-ratio: 1.125;
  --fs: 0.875rem;
  --fs-d3: calc(var(--fs-d2) / var(--fs-ratio));
  --fs-d2: calc(var(--fs-d1) / var(--fs-ratio));
  --fs-d1: calc(var(--fs) / var(--fs-ratio));
  --fs-x2: calc(var(--fs) * var(--fs-ratio));
  --fs-x3: calc(var(--fs-x2) * var(--fs-ratio));
  --fs-x4: calc(var(--fs-x3) * var(--fs-ratio));
  --fs-x5: calc(var(--fs-x4) * var(--fs-ratio));
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 5px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #454b55;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
  overflow-y: scroll;
}

body,
button,
input,
label,
textarea {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
  height: fit-content;
}

button {
  cursor: pointer;
  user-select: none;
}

label {
  white-space: nowrap;
  font-size: var(--fs-d2);
  text-overflow: ellipsis;
}

#templatebot {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.618;
  font-size: var(--fs-d1);
  color: var(--color-white);
  background-color: var(--color-first);
}

.login-part {
  min-height: 100vh;
}

.login-swap-enter-active,
.login-swap-leave-active {
  transition: 300ms ease-in-out;
}

.login-swap-enter-from,
.login-swap-leave-to {
  opacity: 0;
}
</style>