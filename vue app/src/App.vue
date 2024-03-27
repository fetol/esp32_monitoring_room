<template>
  <navigation></navigation>
  <div class="container mt-4">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
  created() {
    this.$store.dispatch('getData', {
      type: 'temperature',
    });
    this.$store.dispatch('getData', {
      type: 'humidity',
    });
    this.$store.dispatch('getData', {
      type: 'pressure',
    });
    this.$store.dispatch('getChart2');

    setInterval(() => {
      this.$store.dispatch('getData', {
        type: 'temperature',
      });
      this.$store.dispatch('getData', {
        type: 'humidity',
      });
      this.$store.dispatch('getData', {
        type: 'pressure',
      });
    }, 3000);
  },
};
</script>