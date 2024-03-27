<template>
  <div class="columns">
    <div class="column">
      <lights-card bulb="Light_1"></lights-card>
    </div>
    <div class="column">
      <lights-card bulb="Light_2"></lights-card>
    </div>
    <div class="column">
      <lights-card bulb="Fan"></lights-card>
    </div>
  </div>
</template>

<script>
import LightsCard from './LightsCard.vue';

export default {
  components: {
    LightsCard,
  },
};
</script>