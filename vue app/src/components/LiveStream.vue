<template>
  <div class="box">
    <p class="is-size-5 has-text-centered has-text-weight-bold">
      Livestream from ESP32 Camera
    </p>
    <div class="is-flex is-justify-content-center mt-2">
      <img src="http://192.168.0.110:81/stream" />
    </div>
  </div>
  <p class="box has-text-centered">
    If you do not see any livestream, there is some problem. Please ignore in
    case you see the livestream.
  </p>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
p,
div {
  font-family: 'Nunito', sans-serif;
}
</style>