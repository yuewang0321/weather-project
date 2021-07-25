<template>
  <div v-if="city">
    <a-row :gutter="[16, 30]">
      <a-col class="heading">
        <a-icon
          type="environment"
          :style="{ fontSize: '5rem', color: '#08c' }"
        />
        {{ startCase(weatherData.city.name) }}, {{ weatherData.city.country }}

        <a-radio-group v-model="unit" style="margin-left: 5rem">
          <a-radio-button value="metric"> °C </a-radio-button>
          <a-radio-button value="imperial"> °F </a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col class="description">
        <div class="extraSpace">Sunrise: {{ descriptions.sunrise }}</div>
        <div class="extraSpace">Sunset: {{ descriptions.sunset }}</div>
        <div class="extraSpace">Population: {{ descriptions.population }}</div>
      </a-col>
    </a-row>
    <LineChart :weather="weatherData.list" class="chart" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  onMounted,
  ref,
  computed,
  watch,
} from "@vue/composition-api";
import { startCase } from "lodash";
import moment from "moment";
import * as c from "../constants.js";
import axios from "axios";
import LineChart from "./LineChart.vue";

export default defineComponent({
  components: { LineChart },
  props: {
    city: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: "metric",
    },
  },
  setup(props) {
    const { city, unit } = toRefs(props);
    const weatherData = ref({});
    const isLoading = ref(false);

    onMounted(async () => {
      try {
        isLoading.value = true;
        const url = c.weatherUrl(city.value, unit.value);
        axios.get(url).then((response) => {
          weatherData.value = response.data;
        });
        isLoading.value = false;
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    });

    watch(city, (city) => {
      try {
        isLoading.value = true;
        const url = c.weatherUrl(city, unit.value);
        axios.get(url).then((response) => {
          weatherData.value = response.data;
        });
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    });

    watch(unit, (unit) => {
      try {
        isLoading.value = true;
        const url = c.weatherUrl(city.value, unit);
        axios.get(url).then((response) => {
          weatherData.value = response.data;
        });
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    });

    const getTime = (timestamp) => {
      const time = moment(timestamp * 1000);
      return time.format("HH:MM:SS") + " EST";
    };

    const formatNumber = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const descriptions = computed(() => {
      return {
        sunrise: getTime(weatherData.value["city"].sunrise),
        sunset: getTime(weatherData.value["city"].sunset),
        population: formatNumber(weatherData.value["city"].population),
      };
    });

    const weatherList = computed(() => {
      return weatherData.value["list"];
    });

    const updateUnit = computed((value) => {
      unit.value = value;
    });

    return {
      startCase,
      moment,
      weatherData,
      descriptions,
      weatherList,
      updateUnit,
      formatNumber,
    };
  },
});
</script>

<style scoped>
.heading {
  margin-top: 3rem;
  margin-left: 4rem;
  font-size: 2rem;
  font-family: cursive;
  overflow: auto;
  width: 100%;
}
.description {
  font-size: 1rem;
  list-style-type: none;
  display: flex;
  margin-left: 6rem;
}
.extraSpace {
  margin-right: 2rem;
}
.chart {
  margin: 5rem;
}
</style>
