<template>
    <div class="pb-3 mx-auto max-w-screen-2xl">
        <div v-if="character">
            <div class="w-11/12 pt-3 mx-auto">
                <h2>Information</h2>
                <p>General information about the character.</p>
            </div>

            <character-attribute-list
                :character="character"
            ></character-attribute-list>

            <div class="w-11/12 pt-3 mx-auto">
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
