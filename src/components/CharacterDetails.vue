<template>
    <div class="mx-auto max-w-screen-2xl pb-24">
        <div v-if="character">
            <img
                :src="character.image"
                class="w-7 absolute top-2 left-6 rounded-md shadow-sm"
            />

            <h1
                class="w-4/6 sm:w-5/6 absolute top-2 left-16 truncate"
                v-text="character.name"
            ></h1>

            <div class="w-11/12 mx-auto pt-3">
                <h2>Information</h2>
                <p>General information about the character.</p>
            </div>

            <character-attribute-list
                :character="character"
            ></character-attribute-list>

            <div class="w-11/12 mx-auto pt-3">
                <h2>Episodes</h2>
                <p>All the episodes where the character appears.</p>
            </div>

            <card-episode
                v-for="episode in episodes(character)"
                :key="episode.id"
                :episode="episode"
            ></card-episode>
        </div>
    </div>
</template>

<script>
import CharacterAttributeList from "./CharacterAttributeList.vue";
import CardEpisode from "./CardEpisode.vue";

import { mapGetters } from "vuex";

export default {
    name: "CharacterInfo",

    components: {
        CharacterAttributeList,
        CardEpisode,
    },

    props: {
        character: Object,
    },

    computed: {
        ...mapGetters("characters", {
            episodes: "getCharacterEpisodes",
        }),
    },
};
</script>
