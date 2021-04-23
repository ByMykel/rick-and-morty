<template>
    <div class="mx-auto max-w-screen-2xl pb-24">
        <spinner :show="loading" :classes="'mt-40'"></spinner>

        <div v-if="!loading && character">
            <img
                :src="character.image"
                class="w-7 absolute top-2 left-6 rounded-md shadow-sm"
            />

            <h1 class="w-4/6 sm:w-5/6 absolute top-2 left-16 truncate">
                {{ character.name }}
            </h1>

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

            <episode-card
                v-for="episode in episodes"
                :key="episode.id"
                :episode="episode"
            ></episode-card>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import CharacterAttributeList from "@/components/CharacterAttributeList.vue";
import EpisodeCard from "@/components/EpisodeCard.vue";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";

const CharactersRepository = RepositoryFactory.get("characters");
const EpisodesRepository = RepositoryFactory.get("episodes");

export default {
    name: "CharacterInfo",

    components: {
        CharacterAttributeList,
        Spinner,
        EpisodeCard,
    },

    props: {
        id: Number,
    },

    data() {
        return {
            character: null,
            episodes: [],
            loading: false,
        };
    },

    mounted() {
        this.fetch();
    },

    methods: {
        async fetch() {
            this.loading = true;

            const data = await CharactersRepository.get(this.id);
            this.character = data.data;

            const episodesId = this.character.episode.map((name) => {
                return name.match(/episode\/(\d+)/).pop();
            });

            const episodes = await EpisodesRepository.get(episodesId);

            this.episodes = Array.isArray(episodes.data)
                ? episodes.data
                : [episodes.data];

            this.loading = false;
        },
    },
};
</script>
