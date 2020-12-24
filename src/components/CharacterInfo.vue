<template>
  <div class="max-w-screen-2xl">
    <Spinner :show="loading" />
    <div v-if="!loading && !error && character">
      <h1 class="w-10/12 absolute top-2 text-purple-700 font-bold truncate">
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
        <h1 class="text-center">Episodes ({{ character.episode.length }})</h1>
        <div
          class="text-center mx-auto shadow-md bg-blue-400 m-2 h-auto md:h-10 flex w-auto md:w-4/5 justify-center items-center rounded-sm border-2 border-blue-500"
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
import axios from "axios";

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

      await axios
        .get(`https://rickandmortyapi.com/api/character/${this.id}`)
        .then((response) => {
          this.character = response.data;
        })
        .catch(() => {
          this.error = true;

          this.loading = false;
          return;
        });

      let episodesId = this.character.episode.map((name) => {
        return name.match(/episode\/(\d+)/).pop();
      });

      await axios
        .get(`https://rickandmortyapi.com/api/episode/${episodesId}`)
        .then((response) => {
          this.episodes = Array.isArray(response.data)
            ? response.data
            : [response.data];
        });

      this.loading = false;
    },
  },
};
</script>
