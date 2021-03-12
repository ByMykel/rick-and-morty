<template>
    <div
        class="bg-white h-72 w-36 sm:w-48 md:w-52 m-2 rounded-md shadow text-center hover:shadow-2xl cursor-pointer"
        @click="$emit('showCharacter', character.id)"
    >
        <div
            class="w-15 h-1 flex justify-center items-center rounded-t-md"
            :class="bgcolor"
        ></div>
        <img
            class="h-48 sm:40 w-full object-cover rounded-b-sm"
            :src="character.image"
        />
        <div class="p-1 text-md font-medium">
            {{ character.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: "CharacterCard",
    props: {
        character: Object,
    },
    computed: {
        bgcolor() {
            return {
                Alive: "bg-green-400",
                Dead: "bg-red-400",
                unknown: "bg-yellow-400",
            }[this.character.status];
        },
    },
};
</script>