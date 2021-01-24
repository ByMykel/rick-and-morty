<template>
    <div class="max-w-screen-2xl">
        <Spinner :show="loading" />
        <div v-if="!loading && !error && character">
            <h1 class="w-4/5 absolute top-2 font-bold truncate">
                {{ character.name }}
            </h1>
            <div class="w-full flex justify-center flex-col md:flex-row">
                <img
                    class="w-52 rounded-md shadow-md mx-auto md:mx-0"
                    :src="character.image"
                    alt=""
                />
                <div class="pl-3 text-center md:text-left">
                    <CharacterAttributeList :character="character" />
                </div>
            </div>
            <div class="pt-3">
                <h1 class="text-center">
                    Episodes ({{ character.episode.length }})
                </h1>
                <div
                    class="text-white text-center mx-auto shadow-md bg-blue-500 m-2 h-auto md:h-10 flex w-auto md:w-4/5 justify-center items-center rounded-md"
                    v-for="episode of episodes"
                    :key="episode.id"
                >
                    {{ episode.id }}. {{ episode.name }}
                </div>
            </div>
        </div>
        <div class="text-center" v-show="error">No Results</div>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import CharacterAttributeList from "@/components/CharacterAttributeList.vue";

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
    },
    data() {
        return {
            character: null,
            episodes: [],
            loading: false,
            error: false,
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
