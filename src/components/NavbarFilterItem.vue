<template>
    <div
        class="flex justify-between px-2 py-2 cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-gray-200 hover:bg-gray-200': selected === index }"
        @click="setSelectedFilter(index)"
    >
        <span class="font-medium">{{ name }}</span>
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