<template>
    <div class="max-w-screen-2xl pb-24">
        <Spinner :show="loading" />
        <div v-if="!loading && character">
            <img
                class="w-7 absolute top-2 rounded-full shadow-md"
                :src="character.image"
                alt=""
            />
            <h1 class="w-4/6 sm:w-5/6 absolute top-2 left-16 truncate">
                {{ character.name }}
            </h1>

            <div class="w-11/12 mx-auto pt-3">
                <h1>Information</h1>
                <p>General information about the character.</p>
            </div>
            <CharacterAttributeList :character="character" />

            <div class="w-11/12 mx-auto pt-3">
                <h1>Episodes</h1>
                <p>All the episodes where the character appears.</p>
            </div>
            <EpisodeCard
                v-for="episode in episodes"
                :key="episode.id"
                :episode="episode"
            />
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
    props: {
        id: Number,
    },
    components: {
        CharacterAttributeList,
        Spinner,
        EpisodeCard,
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
