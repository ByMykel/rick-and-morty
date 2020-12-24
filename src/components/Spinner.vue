<template>
  <half-circle-spinner
    :animation-duration="1500"
    :size="50"
    color="gray"
    v-show="show"
    class="mx-auto pt-2"
  />
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "Spinner",
  props: {
    show: Boolean,
  },
  components: {
    HalfCircleSpinner,
  },
};
</script>