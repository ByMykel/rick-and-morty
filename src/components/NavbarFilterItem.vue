<template>
    <div
        class="hover:bg-gray-100 px-2 mb-0.5 cursor-pointer flex justify-between"
        :class="{ 'bg-gray-100': selected === index }"
        @click="setSelectedFilter(index)"
    >
        <span class="font-medium text-gray-700">{{ name }}</span>
        <span class="flex items-center text-sm">
            {{ filterCount(name) ? filterCount(name) : "" }}
        </span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "NavbarFilterItem",

    props: {
        name: String,
        index: Number,
    },

    computed: {
        ...mapGetters("characters", {
            filterCount: "getNumberOfFilter",
            selected: "getSelectedFilter",
        }),
    },

    methods: {
        setSelectedFilter(selected) {
            this.$store.dispatch("characters/setSelectedFilter", selected);
        },
    },
};
</script>