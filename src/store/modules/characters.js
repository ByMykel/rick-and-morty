import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const CharactersRepository = RepositoryFactory.get("characters");
const LocationsRepository = RepositoryFactory.get("locations");
const EpisodesRepository = RepositoryFactory.get("episodes");

function check(state, character, value) {
    return (
        !state.filters[value].length || state.filters[value].includes(character)
    );
}

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
    locations: [{ name: "unknown" }],
    episodes: [],
});

const getters = {
    getCharacterEpisodes: (state) => (character) => {
        return character.episode.map(episode => state.episodes.get(episode))
      }
    
}

const actions = {
    loadData({ dispatch }) {
        dispatch("getAllCharacters");
        dispatch("getAllLocations");
        dispatch("getAllEpisodes");
    },

    async getAllCharacters({ commit, dispatch }, page = 1) {
        const data = await CharactersRepository.getAll(page);

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
        const data = await LocationsRepository.getAll(page);

        commit("setLocations", data.data.results);

        if (data.data.info.next) {
            dispatch("getAllLocations", ++page);
        } else {
            commit("mapAllLocations");
        }
    },

    async getAllEpisodes({ commit, dispatch }, page = 1) {
        const data = await EpisodesRepository.getAll(page);

        commit("setEpisodes", data.data.results);

        if (data.data.info.next) {
            dispatch("getAllEpisodes", ++page);
        } else {
            commit("mapAllEpisodes");
        }
    },

    filterCharacters({ commit }) {
        commit("filterCharacters");
    },

    setStatusFilter({ commit, state }, filter) {
        commit("resetData");

        if (state.filters.status.includes(filter)) {
            commit("removeStatusFilter", filter);
        } else {
            commit("setStatusFilter", filter);
        }

        commit("filterCharacters");
        commit("loadItems");
    },

    setGenderFilter({ commit, state }, filter) {
        commit("resetData");

        if (state.filters.gender.includes(filter)) {
            commit("removeGenderFilter", filter);
        } else {
            commit("setGenderFilter", filter);
        }

        commit("filterCharacters");
        commit("loadItems");
    },

    setTypeFilter({ commit, state }, filter) {
        commit("resetData");

        if (state.filters.type.includes(filter)) {
            commit("removeTypeFilter", filter);
        } else {
            commit("setTypeFilter", filter);
        }

        commit("filterCharacters");
        commit("loadItems");
    },

    setSpeciesFilter({ commit, state }, filter) {
        commit("resetData");

        if (state.filters.species.includes(filter)) {
            commit("removeSpeciesFilter", filter);
        } else {
            commit("setSpeciesFilter", filter);
        }

        commit("filterCharacters");
        commit("loadItems");
    },

    setOriginFilter({ commit, state }, filter) {
        commit("resetData");

        if (state.filters.origin.includes(filter)) {
            commit("removeOriginFilter", filter);
        } else {
            commit("setOriginFilter", filter);
        }

        commit("filterCharacters");
        commit("loadItems");
    },

    setLocationFilter({ commit, state }, filter) {
        commit("resetData");

        if (state.filters.location.includes(filter)) {
            commit("removeLocationFilter", filter);
        } else {
            commit("setLocationFilter", filter);
        }

        commit("filterCharacters");
        commit("loadItems");
    },

    setNameFilter({ commit }, name) {
        commit("resetData");
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

    setEpisodes(state, episodes) {
        state.episodes.push(...episodes);
    },

    filterCharacters(state) {
        state.filtered = state.all.filter((character) => {
            return (
                check(state, character.status, "status") &&
                check(state, character.gender, "gender") &&
                check(state, character.type, "type") &&
                check(state, character.species, "species") &&
                check(state, character.origin.name, "origin") &&
                check(state, character.location.name, "location") &&
                (!state.filters.name.length ||
                    character.name
                        .toLowerCase()
                        .includes(state.filters.name.toLowerCase()))
            );
        });
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

    resetData(state) {
        state.items = [];
    },

    loadTypeFilters(state, items) {
        items.map((item) => item.type).forEach(state.type.add, state.type);
    },

    loadSpeciesFilters(state, items) {
        items
            .map((item) => item.species)
            .forEach(state.species.add, state.species);
    },

    mapAllLocations(state) {
        state.locations = state.locations.map((item) => item.name);
    },

    mapAllEpisodes(state) {
        state.episodes = new Map(
            state.episodes.map((item) => [item.url, item])
        );
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
