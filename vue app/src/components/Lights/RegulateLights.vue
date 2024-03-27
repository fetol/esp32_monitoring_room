<template>
  <div class="columns">
    <div class="column is-flex is-flex-direction-column">
      <div class="box has-text-centered has-text-weight-bold is-size-5">
        <p>Regulate light</p>
      </div>
      <slider
        class="is-flex is-align-self-center"
        v-model="valueLight"
        orientation="circular"
        color="hsl(171, 100%, 41%)"
        trackColor="hsl(0, 0%, 96%)"
        width="25rem"
        :height="15"
        :tooltip="true"
        max="255"
      ></slider>
    </div>
    <div class="column is-flex is-flex-direction-column">
      <div class="box has-text-centered has-text-weight-bold is-size-5">
        <p>Regulate fan</p>
      </div>
      <slider
        class="is-flex is-align-self-center"
        v-model="valueFan"
        orientation="circular"
        color="hsl(171, 100%, 41%)"
        trackColor="hsl(0, 0%, 96%)"
        width="25rem"
        :height="15"
        :tooltip="true"
        max="255"
      ></slider>
    </div>
  </div>
</template>

<script>
import slider from 'vue3-slider';
import axios from 'axios';
export default {
  components: {
    slider,
  },
  data() {
    return {
      valueLight: 0,
      valueFan: 0,
    };
  },
  watch: {
    valueLight() {
      this.patchData('light');
    },
    valueFan() {
      this.patchData('fan');
    },
  },
  mounted() {
    axios
      .get(
        'https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Reg.json'
      )
      .then((response) => {
        this.valueLight = response.data.RegLight.value;
        this.valueFan = response.data.RegFan.value;
      });
  },
  methods: {
    patchData(param) {
      let isValue = 0;
      let whereData = '';
      if (param === 'light')
        (isValue = this.valueLight), (whereData = 'RegLight');
      else if (param === 'fan')
        (isValue = this.valueFan), (whereData = 'RegFan');
      axios.patch(
        `https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Reg/${whereData}.json?auth=` +
          this.$store.getters.token,
        {
          value: isValue.toString(),
        }
      );
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
.box {
  font-family: 'Nunito', sans-serif;
}
</style>

