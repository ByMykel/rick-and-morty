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
            <modal
                :showing="showModal"
                :showClose="true"
                :backgroundClose="true"
                @close="showModal = false"
            >
                <character-info :id="characterId"></character-info>
            </modal>
        </transition>

        <search-input
            @fetch-data="(filters.name = $event), fetch()"
        ></search-input>

        <search-filter
            :selected-status="filters.status"
            :selected-gender="filters.gender"
            @status-changed="(filters.status = $event), fetch()"
            @gender-changed="(filters.gender = $event), fetch()"
        ></search-filter>

        <div
            v-if="showMessage"
            class="mt-3 max-w-6xl mx-auto sm:px-6 lg:px-8 break-words"
            v-html="message"
        ></div>

        <div class="mt-3 max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
            >
                <character-card
                    v-for="character in characters"
                    :key="character.id"
                    :character="character"
                    @show-character="(characterId = $event), (showModal = true)"
                ></character-card>

                <div
                    v-if="characters.length"
                    v-observe-visibility="handleScrolledToBottom"
                ></div>
            </div>
        </div>

        <spinner :show="loading"></spinner>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import Modal from "@/components/Modal.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import CharacterInfo from "@/components/CharacterInfo.vue";

import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const CharactersRepository = RepositoryFactory.get("characters");

export default {
    name: "CharactersList",

    components: {
        Modal,
        CharacterInfo,
        SearchInput,
        SearchFilter,
        CharacterCard,
        Spinner,
    },

    data() {
        return {
            characters: [],
            numberCharacters: 0,
            page: {
                actual: 1,
                last: 1,
            },
            loading: false,
            filters: {
                name: "",
                status: "",
                gender: "",
            },
            characterId: null,
            showModal: false,
        };
    },

    computed: {
        showMessage() {
            return true;
        },

        message() {
            if (
                this.filters.name &&
                this.filters.status &&
                this.filters.gender
            ) {
                return `${this.numberCharacters} results for <span class="font-medium">${this.filters.status}</span> characters matching <span class="font-medium">${this.filters.name}</span> with <span class="font-medium">${this.filters.gender}</span> gender`;
            }

            if (
                this.filters.name &&
                this.filters.status &&
                !this.filters.gender
            ) {
                return `${this.numberCharacters} results for <span class="font-medium">${this.filters.status}</span> characters matching <span class="font-medium">${this.filters.name}</span>`;
            }

            if (
                this.filters.name &&
                !this.filters.status &&
                this.filters.gender
            ) {
                return `${this.numberCharacters} results for characters matching <span class="font-medium">${this.filters.name}</span> with <span class="font-medium">${this.filters.gender}</span> gender`;
            }

            if (
                !this.filters.name &&
                this.filters.status &&
                this.filters.gender
            ) {
                return `${this.numberCharacters} results for <span class="font-medium">${this.filters.status}</span> characters with <span class="font-medium">${this.filters.gender}</span> gender`;
            }

            if (
                this.filters.name &&
                !this.filters.status &&
                !this.filters.gender
            ) {
                return `${this.numberCharacters} results for characters matching <span class="font-medium">${this.filters.name}</span>`;
            }

            if (
                !this.filters.name &&
                !this.filters.status &&
                this.filters.gender
            ) {
                return `${this.numberCharacters} results for characters with <span class="font-medium">${this.filters.gender}</span> gender`;
            }

            if (
                !this.filters.name &&
                this.filters.status &&
                !this.filters.gender
            ) {
                return `${this.numberCharacters} results for <span class="font-medium">${this.filters.status}</span> characters`;
            }

            return "";
        },
    },

    mounted() {
        this.fetch();
    },

    methods: {
        handleScrolledToBottom(isVisible) {
            if (!isVisible) {
                return;
            }

            this.page.actual++;

            this.fetch(this.page.actual);
        },

        async fetch(page = 1) {
            if (page > this.page.last) {
                return;
            }

            if (page === 1) {
                this.page.actual = 1;
                this.characters = [];
                this.numberCharacters = 0;
            }

            this.loading = true;

            try {
                const data = await CharactersRepository.getAll(
                    this.filters.name,
                    this.filters.status,
                    this.filters.gender,
                    page
                );

                this.characters.push(...data.data.results);
                this.page.last = data.data.info.pages;
                this.numberCharacters = data.data.info.count;
            } catch {
                this.characters = [];
                this.numberCharacters = 0;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
