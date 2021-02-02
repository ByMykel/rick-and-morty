<template>
    <div class="bg-gray-700 m-1 rounded-md p-2 w-11/12 mx-auto" v-if="value">
        <h2 class="text-white">{{ name }}</h2>
        <p class="text-white">{{ value }}</p>
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