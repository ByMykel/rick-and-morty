<template>
    <div class="py-5 pb-12">
        <transition
            enter-active-class="transition ease-out duration-300"
            leave-active-class="transition ease-in duration-75"
            enter-class="transform opacity-0 -translate-y-32"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-32"
        >
            <modal-character
                :showing="showModal"
                :showClose="true"
                :backgroundClose="true"
                :characterId="characterId"
                @close="showModal = false"
            >
            </modal-character>
        </transition>

        <search-bar @fetch-data="name = $event"></search-bar>

        <search-options></search-options>

        <div class="mt-3 max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
            >
                <card-character
                    v-for="character in items"
                    :key="character.id"
                    :character="character"
                    @show-character="(characterId = $event), (showModal = true)"
                ></card-character>

                <div
                    v-if="filtered.length"
                    v-observe-visibility="handleScrolledToBottom"
                ></div>
            </div>
        </div>

        <spinner :show="false"></spinner>
    </div>
</template>

<script>
import Spinner from "../components/Spinner.vue";
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
        Spinner,
    },

    data() {
        return {
            name: "",
            characterId: null,
            showModal: false,
        };
    },

    created() {
        this.$store.dispatch("characters/loadData");
    },

    computed: {
        ...mapState({
            filtered: (state) => state.characters.filtered,
            items: (state) => state.characters.items,
        }),
    },

    watch: {
        name() {
            this.$store.dispatch("characters/setNameFilter", this.name);
        },
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
