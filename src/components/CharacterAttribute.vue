<template>
    <div class="bg-white m-1 rounded-md p-2 w-11/12 mx-auto shadow" v-if="value">
        <h2>{{ name }}</h2>
        <p>{{ value }}</p>
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