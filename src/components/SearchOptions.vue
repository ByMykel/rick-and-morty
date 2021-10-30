<template>
    <transition
        enter-active-class="duration-200 ease-in-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-show="show"
            class="fixed inset-0 z-50 flex justify-end overflow-hidden bg-black bg-opacity-40"
            @click.self="$emit('close-filtes')"
        >
            <transition
                enter-active-class="transition duration-500 ease-in-out transform"
                enter-class="translate-x-full"
                enter-to-class="translate-x-0"
                leave-active-class="transition duration-500 ease-in-out transform"
                leave-class="translate-x-0"
                leave-to-class="translate-x-full"
            >
                <div
                    v-show="show"
                    class="flex flex-col w-full bg-white border-l border-gray-200 "
                    style="max-width: 22rem"
                >
                    <div
                        class="flex items-center justify-between px-2 my-1"
                    >
                        <span class="text-xl font-semibold">Filter options</span>
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
            </transition>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
import FilterMenuHandle from "./FilterMenuHandle.vue";
import Icons from "./Icons.vue";
import NavbarFilter from "./NavbarFilter.vue";

export default {
    name: "SearchOptions",

    components: {
        NavbarFilter,
        Icons,
        FilterMenuHandle,
    },

    props: {
        show: Boolean,
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