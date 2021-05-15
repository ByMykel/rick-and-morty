<template>
    <div ref="showOptions" class="relative inline-block text-left mr-1">
        <div>
            <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 capitalize"
                @click="show = !show"
            >
                <span>{{ name }}</span>

                <icons icon="chevron-down-dropdown"></icons>
            </button>
        </div>

        <transition
            enter-active-class="transition ease-out duration-100"
            leave-active-class="transition ease-in duration-75"
            enter-class="transform opacity-0 -translate-y-3"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-3"
        >
            <div
                v-show="show"
                class="py-1 z-50 origin-top-right absolute left-0 mt-2 w-56 h-auto max-h-60 overflow-auto no-scrollbar rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div
                    v-for="(tag, index) in options"
                    :key="index"
                    :class="{ 'pl-11': !selected.includes(tag) }"
                    class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 capitalize cursor-pointer"
                    @click="
                        handleSelected(tag),
                            (show = false),
                            $store.dispatch(`characters/set${name}Filter`, tag)
                    "
                >
                    <span v-if="selected.includes(tag)">
                        <svg
                            class="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </span>

                    <span class="truncate" v-text="tag ? tag : 'None'"></span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Icons from "./Icons.vue";
import { mapState } from "vuex";

export default {
    name: "FilterTag",

    components: {
        Icons,
    },

    props: {
        name: String,
        options: [Array, Set],
    },

    data() {
        return {
            selected: [],
            show: false,
        };
    },

    computed: {
        ...mapState({
            filters: (state) => state.characters.filters,
        }),
    },

    mounted() {
        document.addEventListener("click", this.onClickOutside);
    },

    methods: {
        onClickOutside(event) {
            const { showOptions } = this.$refs;

            if (!showOptions || showOptions.contains(event.target)) return;

            this.show = false;
        },

        handleSelected(filter) {
            if (this.selected.includes(filter)) {
                this.selected = this.selected.filter(
                    (element) => element !== filter
                );
                return;
            }

            this.selected.push(filter);
        },
    },
};
</script>