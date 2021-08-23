<template>
    <div class="fixed inset-0 z-50 flex justify-end overflow-hidden">
        <div class="absolute inset-0 overflow-hidden bg-black bg-opacity-75">
            <div
                class="fixed inset-y-0 right-0 flex flex-col w-full bg-white border-l border-gray-200 "
                style="max-width: 22rem"
            >
                <div
                    class="flex items-center justify-between px-2 my-1 text-lg font-semibold "
                >
                    <span>Filter options</span>
                    <button @click="$emit('close-filtes')">
                        <icons icon="cross"></icons>
                    </button>
                </div>
                <navbar-filter></navbar-filter>
                <div class="px-5 pt-2">
                    <input
                        v-model="searchText"
                        type="text"
                        class="w-full p-1 mb-1 mr-2 rounded-md"
                    />
                </div>
                <filter-menu-handle
                    :searchText="searchText"
                ></filter-menu-handle>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterMenuHandle from "./FilterMenuHandle.vue";
import Icons from "./Icons.vue";
import NavbarFilter from "./NavbarFilter.vue";

export default {
    name: "SearchFilter",

    components: {
        NavbarFilter,
        Icons,
        FilterMenuHandle,
    },

    data() {
        return {
            showOptions: false,
            searchText: "",
        };
    },

    computed: {
        ...mapGetters("characters", {
            selected: "getSelectedFilter",
        }),

        selectedFilterInText() {
            return {
                0: "Status",
                1: "Gender",
                2: "Type",
                3: "Species",
                4: "Origin",
                5: "Location",
            }[this.selected];
        },
    },
};
</script>