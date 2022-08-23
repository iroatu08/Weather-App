<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-yellow-400">
    <Navigation/>
    <RouterView />
  </div>
</template>


<script setup>
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
</script>