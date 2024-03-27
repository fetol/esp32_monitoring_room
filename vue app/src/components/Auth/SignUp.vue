<template>
  <div v-if="$store.state.showError" class="notification is-danger">
    <button class="delete" @click="closeError"></button>
    <p>
      {{ error + $store.state.errorMessage }}
    </p>
  </div>

  <div v-if="$store.state.showSuccess" class="notification is-primary">
    <button class="delete" @click="closeSuccess"></button>
    <p>{{ successSignUp }}</p>
  </div>
  <div class="box">
    <h2 class="title is-2">Sign Up</h2>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Email address</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            :class="{ 'is-danger': !emailIsValid }"
            type="email"
            placeholder="Your best email"
            v-model.trim="email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p v-if="!emailIsValid" class="help is-danger">
          Check the email please.
        </p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input
            class="input"
            :class="{ 'is-danger': !passwordIsValid }"
            type="password"
            placeholder="Your strong password"
            v-model.trim="password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p v-if="!passwordIsValid" class="help is-danger">
          Check the password please. Must be atleast 6 characters.
        </p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary">Sign Up</button>
        </div>
        <div class="control">
          <!-- type="button" aby mi nesubmitol form, default je type="submit"-->
          <button @click="logInInstead" type="button" class="button is-ghost">
            Log In instead.
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailIsValid: true,
      passwordIsValid: true,
      error: 'Failed to authenticate.',
      successSignUp: 'Sign up succesful.',
    };
  },
  methods: {
    logInInstead() {
      this.$store.commit('toggleModalSignUp');
      this.$store.commit('toggleModalLogIn');
    },
    closeError() {
      this.$store.state.showError = false;
    },
    closeSuccess() {
      this.$store.state.showSuccess = false;
    },
    submitForm() {
      //email
      this.emailIsValid = true;
      if (this.email === '' || !this.email.includes('@')) {
        this.emailIsValid = false;
        return; //nepokračuje dalej v kode
      }
      //heslo
      this.passwordIsValid = true;
      if (this.password === '' || this.password.length < 6) {
        this.passwordIsValid = false;
        return;
      }

      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>