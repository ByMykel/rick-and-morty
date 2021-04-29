<template>
    <div
        class="bg-white h-72 rounded-md shadow text-center hover:shadow-2xl cursor-pointer relative overflow-hidden"
        @click="$emit('show-character', character.id)"
    >
        <div
            :class="genderColor"
            class="top-0 text-xs right-0 absolute font-medium text-white px-3 py-1 rounded-bl-md"
            v-text="character.gender"
        ></div>

        <img class="h-48 sm:40 w-full object-cover" :src="character.image" />

        <div
            :class="statusColor"
            class="w-15 h-1 flex justify-center items-center"
        ></div>

        <div class="p-1 text-md font-medium" v-text="character.name"></div>
    </div>
</template>

<script>
export default {
    name: "CharacterCard",

    props: {
        character: Object,
    },

    computed: {
        statusColor() {
            return {
                Alive: "bg-green-400",
                Dead: "bg-red-400",
                unknown: "bg-yellow-400",
            }[this.character.status];
        },

        genderColor() {
            return {
                Male: "bg-blue-500",
                Female: "bg-purple-500",
                Genderless: "bg-gray-500",
                unknown: "bg-yellow-500",
            }[this.character.gender];
        },
    },
};
</script>