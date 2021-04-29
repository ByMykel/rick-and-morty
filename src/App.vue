<template>
    <div id="app">
        <RickAndMorty />
    </div>
</template>

<script>
import RickAndMorty from "./views/RickAndMorty.vue";

export default {
    name: "App",
    components: {
        RickAndMorty,
    },
};
</script>

<style src="./assets/tailwind.css">
