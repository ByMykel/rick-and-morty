<template>
    <div class="mx-auto mt-2 max-w-6xl w-full sm:px-6 lg:px-8">
        <dropdown
            name="Status"
            :options="['Alive', 'Dead', 'unknown']"
        ></dropdown>

        <dropdown
            name="Gender"
            :options="['Female', 'Male', 'Genderless', 'unknown']"
        ></dropdown>

        <dropdown
            name="Type"
            :options="type"
        ></dropdown>

        <dropdown
            name="Species"
            :options="species"
        ></dropdown>

        <dropdown
            name="Origin"
            :options="locations"
        ></dropdown>

        <dropdown
            name="Location"
            :options="locations"
        ></dropdown>
    </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";
import { mapState } from "vuex";

export default {
    name: "SearchFilter",

    components: {
        Dropdown,
    },

    props: {
        selectedStatus: String,
        selectedGender: String,
    },

    computed: {
        ...mapState({
            type: (state) => state.characters.type,
            species: (state) => state.characters.species,
            locations: (state) => state.characters.locations,
        }),
    },
};
</script>