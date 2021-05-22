<template>
    <div class="mx-auto mt-2 max-w-6xl w-full sm:px-6 lg:px-8">
        <div
            class="flex flex-col sm:flex-row bg-white border border-gray-300 h-80 rounded-md overflow-hidden"
        >
            <div class="hidden sm:block w-44 p-2 text-black">
                <navbar-filter></navbar-filter>
            </div>
            <div
                class="sm:hidden bg-gray-200 rounded-md my-1 mx-1 p-2 flex justify-between"
            >
                <span class="text-sm flex items-center font-bold ml-1">
                    {{ selectedFilterInText }}
                </span>
                <span @click="showOptions = !showOptions">
                    <icons
                        v-if="!showOptions"
                        class="cursor-pointer"
                        icon="chevron-down"
                    ></icons>
                    <icons
                        v-else
                        class="w-6 h-6 cursor-pointer"
                        icon="cross"
                    ></icons>
                </span>
            </div>
            <div
                v-if="showOptions"
                class="flex sm:hidden flex-col space-y-2 m-2 mt-1 text-black"
            >
                <navbar-filter-mobile
                    @close-show-options="showOptions = false"
                ></navbar-filter-mobile>
            </div>
            <filter-menu-handle></filter-menu-handle>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterMenuHandle from "./FilterMenuHandle.vue";
import Icons from "./Icons.vue";
import NavbarFilter from "./NavbarFilter.vue";
import NavbarFilterMobile from "./NavbarFilterMobile.vue";

export default {
    name: "SearchFilter",

    components: {
        NavbarFilter,
        NavbarFilterMobile,
        Icons,
        FilterMenuHandle,
    },

    data() {
        return {
            showOptions: false,
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