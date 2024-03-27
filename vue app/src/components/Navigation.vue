<template>
  <nav class="navbar p-5" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-weight-bold is-size-4 mr-5" href="#">
        maturita2k22
        <!-- status esp online/offline -->
        <esp-status v-if="$store.getters.token != ''"></esp-status>
      </a>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': $store.state.showNav }"
        @click="$store.commit('toggleNav')"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': $store.state.showNav }"
    >
      <div v-if="$store.getters.token != ''" class="navbar-start">
        <router-link to="/home" class="navbar-item is-primary is-size-5"
          >Home</router-link
        >
        <router-link to="/lights" class="navbar-item is-primary is-size-5"
          >Lights</router-link
        >
        <router-link to="/write-data" class="navbar-item is-primary is-size-5"
          >Write data</router-link
        >
        <router-link to="/charts" class="navbar-item is-primary is-size-5"
          >Charts</router-link
        >
        <router-link to="/live-stream" class="navbar-item is-primary is-size-5"
          >Livestream</router-link
        >
        <router-link
          v-if="$store.getters.userId === 'XCvGaNAKsPR6ADhcvCC9hzFC5po2'"
          to="/admin"
          class="navbar-item is-primary is-size-5"
          >Admin options</router-link
        >
      </div>

      <div class="navbar-end">
        <div v-if="$store.getters.token === ''" class="navbar-item">
          <div class="buttons">
            <a
              class="button is-primary"
              @click="$store.commit('toggleModalSignUp')"
              ><strong>Sign up</strong></a
            >
            <a
              class="button is-light"
              @click="$store.commit('toggleModalLogIn')"
            >
              Log in
            </a>
          </div>
        </div>
        <div v-if="$store.getters.token != ''" class="navbar-item">
          <a class="button is-dark" @click="logOut"><strong>Log out</strong></a>
        </div>
      </div>
    </div>
  </nav>

  <!-- SIGN-UP BUTTON -->
  <div class="modal" :class="{ 'is-active': $store.state.showModalSignUp }">
    <div
      class="modal-background"
      @click="$store.commit('toggleModalSignUp')"
    ></div>
    <div class="modal-content">
      <sign-up></sign-up>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>

  <!-- LOG-IN BUTTON -->
  <div class="modal" :class="{ 'is-active': $store.state.showModalLogIn }">
    <div
      class="modal-background"
      @click="$store.commit('toggleModalLogIn')"
    ></div>
    <div class="modal-content">
      <log-in></log-in>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import SignUp from './Auth/SignUp.vue';
import LogIn from './Auth/LogIn.vue';
import EspStatus from './ESPStatus.vue';

export default {
  components: {
    SignUp,
    EspStatus,
    LogIn,
  },
  methods: {
    logOut() {
      this.$store.commit('logOutUser');
      this.$router.replace('/home');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
.navbar {
  font-family: 'Nunito', sans-serif;
}
.navbar-item:hover.is-size-5 {
  color: hsl(171, 100%, 41%);
}
.navbar-item.is-active.is-size-5 {
  color: black;
  border-color: hsl(171, 100%, 41%);
}
.navbar-item:hover.is-size-4,
.navbar-item:focus.is-size-4 {
  color: black;
}
</style>