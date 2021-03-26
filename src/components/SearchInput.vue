<template>
    <div
        class="mx-auto relative text-gray-600 w-full max-w-6xl sm:px-6 lg:px-8"
    >
        <input
            type="text"
            v-model="searchText"
            @keyup="$emit('fetchData', searchText)"
            placeholder="Search by name"
            class="bg-white h-10 w-full px-10 pr-10 rounded-md text-sm focus:outline-none shadow-sm border border-gray-300"
        />
        <button
            type="submit"
            class="absolute left-1 top-0 mt-1 mr-3 sm:left-7 lg:left-9 text-gray-700 hover:bg-gray-200 rounded-md p-1"
            @click="$emit('fetchData', searchText)"
        >
            <Icons icon="search" />
        </button>
    </div>
</template>

<script>
import Icons from "@/components/Icons.vue";

export default {
    name: "SearchInput",
    data() {
        return {
            searchText: "",
        };
    },
    components: {
        Icons,
    },
};
</script>
