<template>
    <div class="mx-auto mt-2 max-w-6xl w-full sm:px-6 lg:px-8">
        <div
            class="flex flex-col sm:flex-row bg-white border border-gray-300 h-80 rounded-md overflow-hidden"
        >
            <div class="hidden sm:block w-44 p-2 text-black">
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

            <div
                class="sm:hidden bg-gray-200 rounded-md my-1 mx-1 p-2 flex justify-between"
            >
                <span class="text-sm flex items-center">
                    <span class="font-bold ml-1">{{
                        selectedFilterInText
                    }}</span>
                </span>

                <span @click="showOptions = !showOptions">
                    <svg
                        v-if="!showOptions"
                        class="w-6 h-6 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>

                    <svg
                        v-else
                        class="w-6 h-6 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </span>
            </div>

            <div
                v-if="showOptions"
                class="flex flex-col space-y-2 m-2 mt-1 text-black"
            >
                <div
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200': selected == 1 }"
                    @click="(selected = 1), (showOptions = false)"
                >
                    Status
                </div>
                <div
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 2 }"
                    @click="(selected = 2), (showOptions = false)"
                >
                    Gender
                </div>
                <div
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 3 }"
                    @click="(selected = 3), (showOptions = false)"
                >
                    Type
                </div>
                <div
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 4 }"
                    @click="(selected = 4), (showOptions = false)"
                >
                    Species
                </div>
                <div
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 5 }"
                    @click="(selected = 5), (showOptions = false)"
                >
                    Origin
                </div>
                <div
                    class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200': selected === 6 }"
                    @click="(selected = 6), (showOptions = false)"
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
            showOptions: false,
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

        selectedFilterInText() {
            return {
                1: "Status",
                2: "Gender",
                3: "Type",
                4: "Species",
                5: "Origin",
                6: "Location",
            }[this.selected];
        },
    },
};
</script>