<template>
  <div class="text-lg" v-if="value">
    {{ name }}:
    <span class="text-red-500">{{ value }}</span>
  </div>
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