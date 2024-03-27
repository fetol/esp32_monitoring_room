<template>
  <!-- /home -->
  <div v-if="$router.currentRoute._value.fullPath === '/home'">
    <div v-if="$store.getters.token != ''" class="columns">
      <p class="box has-text-centered is-hidden-tablet is-size-5 p-4">
        Sorry, you can't see graphs <br />
        on touch device.
      </p>
      <div class="column">
        <div class="box padMe">
          <p class="is-size-1 has-text-centered">
            {{ $store.getters.temperatureNumber }} °C
          </p>
          <p class="is-size-3 has-text-centered">Realtime temperature</p>
        </div>
      </div>
      <div class="column is-two-thirds is-hidden-mobile">
        <div class="box">
          <line-chart
            :data="$store.getters.temperatureChart"
            xtitle="Time"
            ytitle="Temperature"
            suffix=" °C"
            :colors="['#00D1B2']"
          ></line-chart>
        </div>
      </div>
    </div>
    <div v-if="$store.getters.token != ''" class="columns">
      <div class="column">
        <div class="box padMe">
          <p class="is-size-1 has-text-centered">
            {{ $store.getters.humidityNumber }} %
          </p>
          <p class="is-size-3 has-text-centered">Realtime humidity</p>
        </div>
      </div>
      <div class="column is-two-thirds is-hidden-mobile">
        <div class="box">
          <line-chart
            :data="$store.getters.humidityChart"
            xtitle="Time"
            ytitle="Humidity"
            suffix=" %"
            :colors="['#00D1B2']"
          ></line-chart>
        </div>
      </div>
    </div>

    <div v-if="$store.getters.token != ''" class="columns">
      <div class="column">
        <div class="box padMe">
          <p class="is-size-1 has-text-centered">
            {{ $store.getters.pressureNumber }} hPa
          </p>
          <p class="is-size-3 has-text-centered">Realtime pressure</p>
        </div>
      </div>
      <div class="column is-two-thirds is-hidden-mobile">
        <div class="box">
          <line-chart
            :data="$store.getters.pressureChart"
            xtitle="Time"
            ytitle="Pressure"
            suffix=" hPa"
            :colors="['#00D1B2']"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
  <!-- /home -->

  <!-- /charts -->
  <div v-if="$router.currentRoute._value.fullPath === '/charts'">
    <div v-if="$store.getters.token != ''" class="columns">
      <p class="box has-text-centered is-hidden-tablet is-size-5 p-4">
        Sorry, you can't see graphs <br />
        on touch device.
      </p>
      <div class="column is-hidden-mobile">
        <div class="box">
          <line-chart
            :data="$store.getters.chart2"
            xtitle="Time"
            ytitle="Temperature"
            suffix=" °C"
            :colors="['#00D1B2']"
            title="Temperature in the last days"
          ></line-chart>
        </div>
      </div>
    </div>
    <div v-if="$store.getters.token != ''" class="columns">
      <div class="column">
        <div class="box padMe">
          <p class="is-size-1 has-text-centered">
            {{ $store.getters.temperatureNumber }} °C
          </p>
          <p class="is-size-3 has-text-centered">Realtime temperature</p>
        </div>
      </div>
      <div class="column is-two-thirds is-hidden-mobile">
        <div class="box">
          <line-chart
            :data="$store.getters.temperatureChart"
            xtitle="Time"
            ytitle="Temperature"
            suffix=" °C"
            :colors="['#00D1B2']"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
  <!-- /charts -->

  <!-- auth === "" -->
  <div v-if="$store.getters.token === ''" class="columns">
    <div class="column">
      <div class="box padMe">
        <p class="is-size-1 has-text-centered">
          {{ $store.getters.temperatureNumber }} °C
        </p>
        <p class="is-size-3 has-text-centered">Realtime temperature</p>
      </div>
    </div>
    <div class="column">
      <div class="box padMe">
        <p class="is-size-1 has-text-centered">
          {{ $store.getters.humidityNumber }} %
        </p>
        <p class="is-size-3 has-text-centered">Realtime humidity</p>
      </div>
    </div>
    <div class="column">
      <div class="box padMe">
        <p class="is-size-1 has-text-centered">
          {{ $store.getters.pressureNumber }} hPa
        </p>
        <p class="is-size-3 has-text-centered">Realtime pressure</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.padMe {
  padding: 110px 0;
}
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
.column {
  font-family: 'Nunito', sans-serif;
}
</style>