<template>
    <div
        class="relative w-full max-w-6xl mx-auto text-gray-600 sm:px-6 lg:px-8"
    >
        <input
            type="text"
            v-model="searchText"
            placeholder="Search by name"
            class="w-full h-10 px-10 pr-10 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none hover:shadow-md"
            @keyup.prevent="$emit('fetch-data', searchText)"
        />

        <button
            type="submit"
            class="absolute top-0 p-1 mt-1 mr-3 text-gray-700 rounded-md left-1 sm:left-7 lg:left-9 hover:bg-gray-200"
            @click.prevent="$emit('fetch-data', searchText)"
        >
            <icons icon="search"></icons>
        </button>

        <button
            v-if="!loading"
            type="submit"
            class="absolute top-0 p-1 mt-1 text-gray-700 rounded-md right-1 sm:right-7 lg:right-9 hover:bg-gray-200"
            @click.prevent="$emit('toggle-filters')"
        >
            <icons icon="filter"></icons>
        </button>
    </div>
</template>

<script>
import Icons from "./Icons.vue";

import { mapState } from "vuex";

export default {
    name: "SearchInput",

    components: {
        Icons,
    },

    data() {
        return {
            searchText: "",
        };
    },

    computed: {
        ...mapState({
            loading: (state) => state.characters.loading,
        }),
    },
};
</script>
