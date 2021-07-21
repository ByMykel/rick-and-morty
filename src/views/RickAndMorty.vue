<template>
    <div class="py-5 pb-12">
        <modal-character
            :showing="showModal"
            :showClose="true"
            :backgroundClose="true"
            :character="selectedCharacter"
            @close="showModal = false"
        >
        </modal-character>

        <search-bar
            @fetch-data="name = $event"
            @toggle-filters="showFilters = !showFilters"
        ></search-bar>

        <search-options v-show="showFilters"></search-options>

        <div
            v-if="loading"
            class="mt-10 w-full flex flex-col items-center justify-center"
        >
            <svg
                class="w-7 h-7 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
            </svg>
        </div>

        <div v-else class="mt-3 max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div
                class="
                    grid grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-5
                    gap-2
                "
            >
                <card-character
                    v-for="character in items"
                    :key="character.id"
                    :character="character"
                    @show-character="
                        (selectedCharacter = $event), (showModal = true)
                    "
                ></card-character>

                <div
                    v-if="filtered.length"
                    v-observe-visibility="handleScrolledToBottom"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalCharacter from "../components/ModalCharacter.vue";
import SearchBar from "../components/SearchBar.vue";
import SearchOptions from "../components/SearchOptions.vue";
import CardCharacter from "../components/CardCharacter.vue";

import { mapState } from "vuex";

export default {
    name: "RickAndMorty",

    components: {
        ModalCharacter,
        SearchBar,
        SearchOptions,
        CardCharacter,
    },

    data() {
        return {
            name: "",
            selectedCharacter: null,
            showModal: false,
            showFilters: false,
        };
    },

    computed: {
        ...mapState({
            filtered: (state) => state.characters.filtered,
            items: (state) => state.characters.items,
            episodes: (state) => state.characters.episodes,
            loading: (state) => state.characters.loading,
        }),
    },

    watch: {
        name() {
            this.$store.dispatch("characters/setNameFilter", this.name);
        },

        loading(newCount) {
            if (newCount === false) {
                document
                    .querySelector("body")
                    .classList.remove("overflow-hidden");
            }
        },
    },

    created() {
        this.$store.dispatch("characters/loadData");
        document.querySelector("body").classList.add("overflow-hidden");
    },

    methods: {
        handleScrolledToBottom(isVisible) {
            if (!isVisible) {
                return;
            }

            this.$store.dispatch("characters/loadItems");
        },
    },
};
</script>
