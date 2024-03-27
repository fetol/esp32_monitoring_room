<template>
  <article class="panel is-primary p-4">
    <p class="panel-heading has-text-weight-bold has-text-black">
      {{ bulb }}
    </p>
    <div class="columns mt-2">
      <div class="column">
        <button
          class="
            button
            is-primary is-outlined is-fullwidth
            has-text-weight-bold
          "
          @click="patchData('ON')"
        >
          ON
        </button>
      </div>
      <div class="column">
        <button
          class="button is-outlined is-fullwidth is-dark has-text-weight-bold"
          @click="patchData('OFF')"
        >
          OFF
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios';

export default {
  props: ['bulb'],

  methods: {
    patchData(param) {
      axios.patch(
        `https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Lights/${this.bulb}.json?auth=` +
          this.$store.getters.token,
        {
          isLight: param,
        }
      );
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
p,
button {
  font-family: 'Nunito', sans-serif;
}
</style>