<template>
    <div
        class="bg-white h-72 w-60 sm:w-52 m-2 rounded-md shadow text-center hover:shadow-2xl"
        @click="$emit('showCharacter', character.id)"
    >
        <img
            class="h-48 sm:40 w-full rounded-t-md object-cover"
            :src="character.image"
        />
        <div class="w-15 h-5 flex justify-center items-center" :class="bgcolor">
            {{ character.status }}
        </div>
        <div class="p-1 text-md text-black font-medium">
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