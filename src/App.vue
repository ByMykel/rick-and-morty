<template>
  <div id="app">
    <CharactersList />
  </div>
</template>

<script>
import CharactersList from "./views/CharactersList.vue";

export default {
  name: "App",
  components: {
    CharactersList,
  },
};
</script>

<style src="./assets/tailwind.css">
