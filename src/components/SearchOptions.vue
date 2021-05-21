<template>
    <div class="mx-auto mt-2 max-w-6xl w-full sm:px-6 lg:px-8">
        <div
            class="flex flex-col bg-white border border-gray-300 h-72 rounded-md overflow-hidden"
        >
            <div class="w-44 p-2 text-black flex">
                <div
                    class="hover:bg-gray-200 rounded px-2 mb-0.5 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 1 }"
                    @click="selected = 1"
                >
                    Status
                </div>
                <div
                    class="hover:bg-gray-200 rounded px-2 mb-0.5 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 2 }"
                    @click="selected = 2"
                >
                    Gender
                </div>
                <div
                    class="hover:bg-gray-200 rounded px-2 mb-0.5 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 3 }"
                    @click="selected = 3"
                >
                    Type
                </div>
                <div
                    class="hover:bg-gray-200 rounded px-2 mb-0.5 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 4 }"
                    @click="selected = 4"
                >
                    Species
                </div>
                <div
                    class="hover:bg-gray-200 rounded px-2 mb-0.5 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 5 }"
                    @click="selected = 5"
                >
                    Origin
                </div>
                <div
                    class="hover:bg-gray-200 rounded px-2 mb-0.5 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 6 }"
                    @click="selected = 6"
                >
                    Location
                </div>
            </div>

            <filter-menu
                v-show="selected === 1"
                name="Status"
                :options="status"
            ></filter-menu>
            <filter-menu
                v-show="selected === 2"
                name="Gender"
                :options="gender"
            ></filter-menu>
            <filter-menu
                v-show="selected === 3"
                name="Type"
                :options="type"
            ></filter-menu>
            <filter-menu
                v-show="selected === 4"
                name="Species"
                :options="species"
            ></filter-menu>
            <filter-menu
                v-show="selected === 5"
                name="Origin"
                :options="locations"
            ></filter-menu>
            <filter-menu
                v-show="selected === 6"
                name="Location"
                :options="locations"
            ></filter-menu>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FilterMenu from "./FilterMenu.vue";

export default {
    name: "SearchFilter",

    components: {
        FilterMenu,
    },

    data() {
        return {
            selected: 1,
        };
    },

    computed: {
        ...mapState({
            status: (state) => state.characters.status,
            gender: (state) => state.characters.gender,
            locations: (state) => state.characters.locations,
        }),

        ...mapGetters("characters", {
            type: "getCharactersType",
            species: "getCharactersSpecies",
        }),
    },
};
</script>