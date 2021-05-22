<template>
    <div class="w-full">
        <filter-menu
            v-show="selected === 0"
            name="Status"
            :options="status"
        ></filter-menu>
        <filter-menu
            v-show="selected === 1"
            name="Gender"
            :options="gender"
        ></filter-menu>
        <filter-menu
            v-show="selected === 2"
            name="Type"
            :options="type"
        ></filter-menu>
        <filter-menu
            v-show="selected === 3"
            name="Species"
            :options="species"
        ></filter-menu>
        <filter-menu
            v-show="selected === 4"
            name="Origin"
            :options="locations"
        ></filter-menu>
        <filter-menu
            v-show="selected === 5"
            name="Location"
            :options="locations"
        ></filter-menu>
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

    computed: {
        ...mapState({
            status: (state) => state.characters.status,
            gender: (state) => state.characters.gender,
            locations: (state) => state.characters.locations,
        }),

        ...mapGetters("characters", {
            type: "getCharactersType",
            species: "getCharactersSpecies",
            selected: "getSelectedFilter",
        }),
    },
};
</script>