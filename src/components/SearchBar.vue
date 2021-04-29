<template>
    <div
        class="mx-auto relative text-gray-600 w-full max-w-6xl sm:px-6 lg:px-8"
    >
        <input
            type="text"
            v-model="searchText"
            placeholder="Search by name"
            class="bg-white h-10 w-full px-10 pr-10 rounded-md text-sm focus:outline-none shadow-sm border border-gray-300 hover:shadow-md"
            @keyup.prevent="$emit('fetch-data', searchText)"
        />

        <button
            type="submit"
            class="absolute left-1 top-0 mt-1 mr-3 sm:left-7 lg:left-9 text-gray-700 hover:bg-gray-200 rounded-md p-1"
            @click.prevent="$emit('fetch-data', searchText)"
        >
            <icons icon="search"></icons>
        </button>
    </div>
</template>

<script>
import Icons from "./Icons.vue";

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
};
</script>
