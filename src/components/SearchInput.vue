<template>
    <div class="flex justify-center">
        <div class="relative text-gray-600 w-5/6 max-w-6xl">
            <input
                type="text"
                v-model="searchText"
                @keyup="$emit('fetchData', searchText)"
                placeholder="Search by name"
                class="bg-white h-10 w-full px-10 pr-10 rounded-full text-sm focus:outline-none shadow-sm"
            />
            <button
                type="submit"
                class="absolute right-0 top-0 mt-1 mr-1 text-gray-700 hover:bg-gray-200 rounded-full p-1"
                title="filters"
                @click="$emit('toggleFilter')"
            >
                <Icons icon="adjustments" />
            </button>
            <button
                type="submit"
                class="absolute left-1 top-0 mt-1 mr-3 text-gray-700 hover:bg-gray-200 rounded-full p-1"
                @click="$emit('fetchData', searchText)"
            >
                <Icons icon="search" />
            </button>
        </div>
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
