<template>
  <main  class ="container text-white">
  <div class="pt-4 mb-8 relative">
<input v-model="searchTerm" @input="getSearchTermResults" type="text" name="" id="" placeholder="Search for a city or stater here..." class="py-2 px-1 w-full bg-transparent border-b focus:border-gray-200 focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

    <ul
        class="absolute bg-gray-400 text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
      <p v-if="searchError">
      Sorry something went wrong, please try again!
      </p>
      <p v-if="!searchError && mapboxSearchResults.length == 0">
      Sorry no search results were found, please try a different term,
      </p>

      <template v-else>
        <li
          v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
          @click="previewCity(searchResult)"
       
        >
          {{ searchResult.place_name }}
        </li>
      </template>
       
      </ul>


  </div>

<div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
         <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';
 

const router = useRouter();

const previewCity = (searchResult) =>{
  console.log(searchResult)
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: 'ViewCity',
    params: {state: state.replaceAll(" ", ""), city:city},
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  })
}



const mapboxAPIKey = "pk.eyJ1IjoiaXJvYXR1NyIsImEiOiJjbDcwZnFoOXUwZTA2M25veTdreWo0a2VsIn0.z5tcZN0d3GbX3cSY5HFfWg";
const searchTerm = ref("");
const querySearchTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

//implementing the Lazy Search usign setTimeOut
const getSearchTermResults = () => {
clearTimeout(querySearchTimeout.value);

querySearchTimeout.value = setTimeout(async () => {
if (searchTerm.value !== ''){
  try{
    const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm.value}.json?access_token=${mapboxAPIKey}&types=place`);

mapboxSearchResults.value = result.data.features;
console.log(mapboxSearchResults.value)
  } catch{
    searchError.value = true;
  }

return;
};

mapboxSearchResults.value = null;

}, 300);

};

</script>
