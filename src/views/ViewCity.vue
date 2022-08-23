<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncCityView />
      </template>
      <template #fallback>
        <ViewCitySkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
import ViewCitySkeleton from '../components/ViewCitySkeleton.vue';

</script>

