<template>
  <div>
    <line-chart
      :data="weatherData"
      :colors="['#a7a8bd', '#a61b29']"
    ></line-chart>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "@vue/composition-api";

export default defineComponent({
  props: {
    weather: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { weather } = toRefs(props);
    const chartData = {
      "2017-05-13": 2,
      "2017-05-14": 5,
      "2017-05-15": 4,
    };

    const weatherData = computed(() => {
      const temp = {};
      const feels = {};
      weather.value.forEach((item) => {
        temp[item["dt_txt"]] = item["main"].temp;
        feels[item["dt_txt"]] = item["main"].feels_like;
      });
      return [
        { name: "Temperature", data: temp },
        { name: "Feels Like", data: feels },
      ];
    });
    return { chartData, weatherData };
  },
});
</script>
