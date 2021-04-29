<template>
    <div
        v-if="value"
        class="bg-white m-1 rounded-md p-2 w-11/12 mx-auto shadow"
    >
        <h3 v-text="name"></h3>
        <p v-text="value"></p>
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