<template>
  <h1 class="text-lg" v-if="value">
    {{ name }}:
    <span class="text-blue-500">{{ value }}</span>
  </h1>
</template>

<script>
export default {
  name: "CharacterAttribute",
  props: {
    name: String,
    value: String,
  },
};
</script>