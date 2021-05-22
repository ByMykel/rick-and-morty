<template>
    <div
        class="px-3 py-2 rounded-md text-sm hover:bg-gray-200 cursor-pointer flex justify-between mb-2"
        :class="{ 'bg-gray-200': selected === index }"
        @click="setSelectedFilter(index), $parent.$emit('close-show-options')"
    >
        <span class="font-medium">{{ name }}</span>
        <span class="flex items-center">
            {{ filterCount(name) ? filterCount(name) : "" }}
        </span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "NavbarFilterMobileItem",

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