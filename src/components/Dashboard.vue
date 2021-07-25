<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Weather Forecast"
      sub-title="weather report for 5 days"
      :backIcon="false"
      @back="() => null"
    />
    <a-row :gutter="[16, 30]" style="margin: 0.5rem 0.25rem">
      <a-col span="8" class="">
        <a-input-search
          placeholder="Enter a city"
          enter-button="Search"
          @search="onSearch"
          allow-clear
        />
      </a-col>
    </a-row>
    <div>
      <weather :city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import City from "./City.vue";
import Weather from "./Weather.vue";

export default defineComponent({
  components: { City, Weather },
  setup() {
    const city = ref("toronto");
    const unit = ref("metric");

    const onSearch = (input) => {
      if (input) {
        city.value = input;
      }
    };
    return {
      onSearch,
      city,
      unit,
    };
  },
});
</script>
