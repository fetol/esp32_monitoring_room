<template>
  <div class="box">
    <p class="has-text-centered is-size-5 has-text-weight-bold">
      Database data
    </p>
    <p class="is-size-5">{{ databaseMessage }}</p>
  </div>
  <div class="box">
    <textarea
      class="textarea"
      v-model="message"
      placeholder="Write something..."
      @keyup.enter="patchData"
    ></textarea>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      databaseMessage: '',
    };
  },
  mounted() {
    setInterval(() => {
      axios
        .get(
          'https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/DisplayData/value.json'
        )
        .then((response) => {
          this.databaseMessage = response.data;
        });
    }, 1000);
  },
  methods: {
    patchData() {
      axios.patch(
        `https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/DisplayData.json?auth=` +
          this.$store.getters.token,
        {
          /* nakonci stringu zostavalo \n */
          value: this.message.slice(0, this.message.length - 1),
        }
      );
      this.message = ''; /* clear vstup */
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
p,
textarea {
  font-family: 'Nunito', sans-serif;
}
</style>