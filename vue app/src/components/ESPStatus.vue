<template>
  <div class="content has-text-centered">
    <!-- farby: is-primary ONLINE, is-black OFFLINE -->
    <span v-if="isOn" class="tag is-primary m-2">{{ espStatus }}LINE</span>
    <span v-else class="tag is-dark m-2">{{ espStatus }}LINE</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      espStatus: '',
      isOn: true,
    };
  },
  mounted() {
    axios
      .get(
        'https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Esp.json?auth=' +
          this.$store.getters.token
      )
      .then((response) => {
        this.espStatus = response.data.EspStatus;
        console.log(this.espStatus);

        if (this.espStatus === 'ON') this.isOn = true;
        else this.isOn = false;
      });
    // OFF každých 15 sekund
    setInterval(() => {
      axios.patch(
        `https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Esp.json?auth=` +
          this.$store.getters.token,
        {
          EspStatus: 'OFF',
        }
      );
    }, 120000);

    //dostavam data z databazy
    setInterval(() => {
      axios
        .get(
          'https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Esp.json?auth=' +
            this.$store.getters.token
        )
        .then((response) => {
          this.espStatus = response.data.EspStatus;
          console.log(this.espStatus);
          if (this.espStatus === 'ON') this.isOn = true;
          else this.isOn = false;
        });
    }, 13000);
  },
};
</script>
