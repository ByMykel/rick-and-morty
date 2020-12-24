<template>
  <div class="bg-gray-200 py-5 pb-12">
    <Modal
      :showing="showModal"
      @close="showModal = false"
      :showClose="true"
      :backgroundClose="true"
    >
      <CharacterInfo :id="characterId" />
    </Modal>
    <SearchInput
      @fetchData="(searchText = $event), fetch(1)"
      @toggleFilter="showFilter = !showFilter"
    />
    <SearchFilter
      @statusChanged="(status = $event), fetch(1)"
      @genderChanged="(gender = $event), fetch(1)"
      v-show="showFilter"
      :selectedStatus="status"
      :selectedGender="gender"
    />
    <div class="flex flex-wrap justify-center p-3">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :id="character.id"
        :name="character.name"
        :image="character.image"
        :status="character.status"
        @showCharacter="(characterId = $event), (showModal = true)"
      />
      <div
        v-if="characters.length"
        v-observe-visibility="handleScrolledToBottom"
      ></div>
    </div>
    <half-circle-spinner
      :animation-duration="1500"
      :size="50"
      color="gray"
      v-show="loading && !error"
      class="mx-auto pt-2"
    />
    <div class="text-center" v-show="error">No Results</div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import Modal from "@/components/Modal.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import CharacterInfo from "@/components/CharacterInfo.vue";
import axios from "axios";

export default {
  name: "Characters",
  components: {
    Modal,
    CharacterInfo,
    SearchInput,
    SearchFilter,
    CharacterCard,
    HalfCircleSpinner,
  },
  data() {
    return {
      characters: [],
      actualPage: 1,
      lastPage: 1,
      loading: false,
      searchText: "",
      showFilter: false,
      status: "",
      gender: "",
      characterId: null,
      showModal: false,
      error: false,
    };
  },
  computed: {
    filters() {
      return `?name=${this.searchText}&status=${this.status}&gender=${this.gender}`;
    },
  },
  mounted() {
    this.fetch(1);
  },
  methods: {
    handleScrolledToBottom(isVisible) {
      if (!isVisible) {
        return;
      }

      this.actualPage++;

      this.fetch(this.actualPage);
    },
    async fetch(page) {
      if (page > this.lastPage) {
        return;
      }

      this.loading = true;

      if (page == 1) {
        this.actualPage = 1;
        this.characters = [];
      }

      await axios
        .get(
          `https://rickandmortyapi.com/api/character/${this.filters}&page=${page}`
        )
        .then((response) => {
          this.characters.push(...response.data.results);
          this.lastPage = response.data.info.pages;
          this.error = false;
          this.loading = false;
        })
        .catch(() => {
          this.characters = [];
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>
