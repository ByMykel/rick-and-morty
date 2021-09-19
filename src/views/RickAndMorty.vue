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

        <search-options
            :show="showFilters"
            @close-filtes="showFilters = false"
        ></search-options>

        <div
            v-if="loading"
            class="flex items-center justify-center w-full mt-10"
        >
            <svg
                class="text-gray-700 fill-current animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
            </svg>
            <span class="ml-1 font-medium text-gray-700">{{
                loadingMessage
            }}</span>
        </div>

        <div v-else class="max-w-6xl mx-auto mt-3 sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-2 gap-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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
            loadingMessage: (state) => state.characters.loading_message,
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

        showFilters(value) {
            if (value) {
                document.querySelector("body").classList.add("overflow-hidden");
                return;
            }
            document.querySelector("body").classList.remove("overflow-hidden");
            return;
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
