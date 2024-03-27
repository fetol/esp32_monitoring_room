<template>
  <lights-card-model></lights-card-model>
  <regulate-lights class="mt-5 is-hidden-mobile"></regulate-lights>
  <p class="box has-text-centered is-hidden-tablet is-size-5 p-4">
    Sorry, you can't regulate <br />
    fan and light on touch device.
  </p>
</template>

<script>
import LightsCardModel from './LightsCardModel.vue';
import RegulateLights from './RegulateLights.vue';

export default {
  components: {
    LightsCardModel,
    RegulateLights,
  },
};
</script>