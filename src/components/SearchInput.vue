<template>
    <div class="flex justify-center">
        <div class="relative text-gray-600 w-5/6 max-w-6xl">
            <input
                type="text"
                v-model="searchText"
                @keyup="$emit('fetchData', searchText)"
                placeholder="Search by name"
                class="bg-white h-10 w-full px-5 pr-10 rounded-full text-sm focus:outline-none shadow-sm"
            />
            <button
                type="submit"
                class="absolute right-0 top-0 mt-2 mr-3 text-blue-400"
                title="filters"
                @click="$emit('toggleFilter')"
            >
                <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchInput",
    data() {
        return {
            searchText: "",
        };
    },
};
</script>
