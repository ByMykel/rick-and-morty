<template>
    <div class="py-5 pb-12">
        <Modal
            :showing="showModal"
            @close="showModal = false"
            :showClose="true"
            :backgroundClose="true"
        >
            <CharacterInfo :id="characterId" />
        </Modal>
        <SearchInput
            @fetchData="(filters.name = $event), fetch()"
            @toggleFilter="showFilter = !showFilter"
        />
        <SearchFilter
            @statusChanged="(filters.status = $event), fetch()"
            @genderChanged="(filters.gender = $event), fetch()"
            v-show="showFilter"
            :selectedStatus="filters.status"
            :selectedGender="filters.gender"
        />
        <div class="flex flex-wrap justify-center max-w-6xl mx-auto pt-3">
            <CharacterCard
                v-for="character in characters"
                :key="character.id"
                :character="character"
                @showCharacter="(characterId = $event), (showModal = true)"
            />
            <div
                v-if="characters.length"
                v-observe-visibility="handleScrolledToBottom"
            ></div>
        </div>
        <Spinner :show="loading" />
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
            page: {
                actual: 1,
                last: 1,
            },
            loading: false,
            showFilter: false,
            filters: {
                name: "",
                status: "",
                gender: "",
            },
            characterId: null,
            showModal: false,
        };
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
                this.loading = false;
            } catch {
                this.characters = [];
                this.loading = false;
            }
        },
    },
};
</script>
