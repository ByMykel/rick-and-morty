<template>
    <div class="overflow-auto">
        <filter-menu
            v-show="selected === 0"
            name="Status"
            :options="status"
            :searchText="searchText"
        ></filter-menu>
        <filter-menu
            v-show="selected === 1"
            name="Gender"
            :options="gender"
            :searchText="searchText"
        ></filter-menu>
        <filter-menu
            v-show="selected === 2"
            name="Type"
            :options="type"
            :searchText="searchText"
        ></filter-menu>
        <filter-menu
            v-show="selected === 3"
            name="Species"
            :options="species"
            :searchText="searchText"
        ></filter-menu>
        <filter-menu
            v-show="selected === 4"
            name="Origin"
            :options="locations"
            :searchText="searchText"
        ></filter-menu>
        <filter-menu
            v-show="selected === 5"
            name="Location"
            :options="locations"
            :searchText="searchText"
        ></filter-menu>
    </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import FilterMenu from "./FilterMenu.vue";

export default {
    name: "FilterMenuHandle",

    props: {
        searchText: String,
    },

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