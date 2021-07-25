<template>
  <div>
    <!-- #ccccd6 #d0dfe6 -->
    <!-- <div style="background: #f1f0ed; padding: rem">
        <a-card :title="startCase(city)" :bordered="false" style="width: 300px">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </div> -->

    <div style="background: #ececec; padding: 1.5rem; margin: 0.5rem">
      <!-- <router-link :to="{ name: 'weather', params: { city: city } }"> -->
      <a-card :title="startCase(city)" :bordered="false" style="overflow-auto">
        <span v-for="(data, key) in cardData" :key="key">
          <li>{{ startCase(key) }}: {{ data }}</li>
        </span>
      </a-card>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "@vue/composition-api";
import { startCase, omit } from "lodash";
import moment from "moment";

export default defineComponent({
  props: {
    city: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { data } = toRefs(props);

    const getTime = (timestamp) => {
      const time = moment(timestamp * 1000);
      return time.format("hh:mm:ss") + " EST";
    };

    const cardData = computed(() => {
      const originalData = omit(data.value.city, [
        "id",
        "coord",
        "name",
        "timezone",
      ]);
      const newData = {
        Country: originalData.country,
        Population: originalData.population,
        Sunrise: getTime(originalData.sunrise),
        Sunset: getTime(originalData.sunset),
      };
      return newData;
    });

    // const openDetails = () => {};

    return { startCase, cardData, moment };
  },
});
</script>
