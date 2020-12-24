<template>
  <div class="max-w-screen-2xl">
    <half-circle-spinner
      :animation-duration="1500"
      :size="50"
      color="gray"
      v-show="loading"
      class="mx-auto mt-32"
    />
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
          <CharacterAttribute name="Status" :value="character.status" />
          <CharacterAttribute name="Species" :value="character.species" />
          <CharacterAttribute name="Type" :value="character.type" />
          <CharacterAttribute name="Gender" :value="character.gender" />
          <CharacterAttribute name="Origin" :value="character.origin.name" />
          <CharacterAttribute
            name="Location"
            :value="character.location.name"
          />
        </div>
      </div>
      <div class="pt-3">
        <h1 class="text-center">Episodes ({{ character.episode.length }})</h1>
        <div v-for="episode of episodes" :key="episode.id">
          <div
            class="text-center mx-auto shadow-md bg-blue-400 m-2 h-auto md:h-10 flex w-auto md:w-4/5 justify-center items-center rounded-sm border-2 border-blue-500"
          >
            {{ episode.id }}. {{ episode.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-show="error">No Results</div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import CharacterAttribute from "@/components/CharacterAttribute.vue";
import axios from "axios";

export default {
  name: "CharacterInfo",
  props: {
    id: Number,
  },
  components: {
    CharacterAttribute,
    HalfCircleSpinner,
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
