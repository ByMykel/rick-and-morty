import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const CharactersRepository = RepositoryFactory.get("characters");
const LocationsRepository = RepositoryFactory.get("locations");

const state = () => ({
    all: [],
    filtered: [],
    items: [],
    filters: {
        name: "",
        status: [],
        gender: [],
        type: [],
        species: [],
        origin: [],
        location: [],
    },
    type: new Set(),
    species: new Set(),
    locations: [{name: 'unknown'}],
});

const actions = {
    loadData({ dispatch }) {
        dispatch("getAllCharacters");
        dispatch("getAllLocations");
    },

    async getAllCharacters({ commit, dispatch }, page = 1) {
        let data = await CharactersRepository.getAll("", "", "", page);
        commit("setCharacters", data.data.results);
        commit("loadSpeciesFilters", data.data.results);
        commit("loadTypeFilters", data.data.results);

        if (data.data.info.next) {
            dispatch("getAllCharacters", ++page);
        } else {
            commit("filterCharacters");
            commit("loadItems");
        }
    },

    async getAllLocations({ commit, dispatch }, page = 1) {
        let data = await LocationsRepository.getAll(page);
        commit("setLocations", data.data.results);

        if (data.data.info.next) {
            dispatch("getAllLocations", ++page);
        } else {
            commit("mapAllLocations");
        }
    },

    filterCharacters({ commit }) {
        commit("filterCharacters");
    },

    setStatusFilter({ commit, state }, filter) {
        commit("resetPage");
        if (state.filters.status.includes(filter)) {
            commit("removeStatusFilter", filter);
            commit("filterCharacters");
            commit("loadItems");
            return;
        }

        commit("setStatusFilter", filter);
        commit("filterCharacters");
        commit("loadItems");
    },

    setGenderFilter({ commit, state }, filter) {
        commit("resetPage");
        if (state.filters.gender.includes(filter)) {
            commit("removeGenderFilter", filter);
            commit("filterCharacters");
            commit("loadItems");
            return;
        }
        commit("setGenderFilter", filter);
        commit("filterCharacters");
        commit("loadItems");
    },

    setTypeFilter({ commit, state }, filter) {
        commit("resetPage");
        if (state.filters.type.includes(filter)) {
            commit("removeTypeFilter", filter);
            commit("filterCharacters");
            commit("loadItems");
            return;
        }
        commit("setTypeFilter", filter);
        commit("filterCharacters");
        commit("loadItems");
    },

    setSpeciesFilter({ commit, state }, filter) {
        commit("resetPage");
        if (state.filters.species.includes(filter)) {
            commit("removeSpeciesFilter", filter);
            commit("filterCharacters");
            commit("loadItems");
            return;
        }
        commit("setSpeciesFilter", filter);
        commit("filterCharacters");
        commit("loadItems");
    },

    setOriginFilter({ commit, state }, filter) {
        commit("resetPage");
        if (state.filters.origin.includes(filter)) {
            commit("removeOriginFilter", filter);
            commit("filterCharacters");
            commit("loadItems");
            return;
        }
        commit("setOriginFilter", filter);
        commit("filterCharacters");
        commit("loadItems");
    },

    setLocationFilter({ commit, state }, filter) {
        commit("resetPage");
        if (state.filters.location.includes(filter)) {
            commit("removeLocationFilter", filter);
            commit("filterCharacters");
            commit("loadItems");
            return;
        }
        commit("setLocationFilter", filter);
        commit("filterCharacters");
        commit("loadItems");
    },

    setNameFilter({ commit }, name) {
        commit("resetPage");
        commit("setNameFilter", name);
        commit("filterCharacters");
        commit("loadItems");
    },

    loadItems({ commit }) {
        commit("loadItems");
    },
};

const mutations = {
    setCharacters(state, characters) {
        state.all.push(...characters);
    },

    setLocations(state, locations) {
        state.locations.push(...locations);
    },

    filterCharacters(state) {
        const characters = state.all.filter((character) => {
            return (
                (!state.filters.status.length ||
                    state.filters.status.includes(character.status)) &&
                (!state.filters.gender.length ||
                    state.filters.gender.includes(character.gender)) &&
                (!state.filters.type.length ||
                    state.filters.type.includes(character.type)) &&
                (!state.filters.species.length ||
                    state.filters.species.includes(character.species)) &&
                (!state.filters.origin.length ||
                    state.filters.origin.includes(character.origin.name)) &&
                (!state.filters.location.length ||
                    state.filters.location.includes(character.location.name)) &&
                (!state.filters.name.length ||
                    character.name
                        .toLowerCase()
                        .includes(state.filters.name.toLowerCase()))
            );
        });

        state.filtered = characters;
    },

    setStatusFilter(state, filter) {
        state.filters.status.push(filter);
    },

    removeStatusFilter(state, filter) {
        state.filters.status = state.filters.status.filter(
            (element) => element !== filter
        );
    },

    setSpeciesFilter(state, filter) {
        state.filters.species.push(filter);
    },

    removeSpeciesFilter(state, filter) {
        state.filters.species = state.filters.species.filter(
            (element) => element !== filter
        );
    },

    setGenderFilter(state, filter) {
        state.filters.gender.push(filter);
    },

    removeGenderFilter(state, filter) {
        state.filters.gender = state.filters.gender.filter(
            (element) => element !== filter
        );
    },

    setOriginFilter(state, filter) {
        state.filters.origin.push(filter);
    },

    removeOriginFilter(state, filter) {
        state.filters.origin = state.filters.origin.filter(
            (element) => element !== filter
        );
    },

    setLocationFilter(state, filter) {
        state.filters.location.push(filter);
    },

    removeLocationFilter(state, filter) {
        state.filters.location = state.filters.location.filter(
            (element) => element !== filter
        );
    },

    setTypeFilter(state, filter) {
        state.filters.type.push(filter);
    },

    removeTypeFilter(state, filter) {
        state.filters.type = state.filters.type.filter(
            (element) => element !== filter
        );
    },

    setNameFilter(state, name) {
        state.filters.name = name;
    },

    loadItems(state) {
        state.items.push(...state.filtered.splice(0, 20));
    },

    resetPage(state) {
        state.items = [];
    },

    loadTypeFilters(state, items) {
        items.map((item) => item.type).forEach(state.type.add, state.type);
    },

    loadSpeciesFilters(state, items) {
        items.map((item) => item.species).forEach(state.species.add, state.species);
    },

    mapAllLocations(state) {
        state.locations = state.locations.map(item => item.name);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
