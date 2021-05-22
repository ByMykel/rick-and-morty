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
        selected: 0,
        name: "",
        status: [],
        gender: [],
        type: [],
        species: [],
        origin: [],
        location: [],
    },
    status: ["Alive", "Dead", "unknown"],
    gender: ["Female", "Male", "Genderless", "unknown"],
    type: new Set(),
    species: new Set(),
    locations: [{ name: "unknown" }],
    episodes: [],
    loading: true,
});

const getters = {
    getSelectedFilter: (state) => {
        return state.filters.selected;
    },

    getNumberOfFilter: (state) => (filter) => {
        return state.filters[filter.toLowerCase()].length;
    },

    getCharacterEpisodes: (state) => (character) => {
        return character.episode.map((episode) => state.episodes.get(episode));
    },

    getCharactersType: (state) => {
        return [...state.type];
    },

    getCharactersSpecies: (state) => {
        return [...state.species];
    },
};

const actions = {
    async loadData({ dispatch }) {
        await dispatch("getAllCharacters");
        await dispatch("getAllLocations");
        await dispatch("getAllEpisodes");
        dispatch("finishLoading");
    },

    async getAllCharacters({ commit, dispatch }, page = 1) {
        const data = await CharactersRepository.getAll(page);

        commit("setCharacters", data.data.results);
        commit("loadSpeciesFilters", data.data.results);
        commit("loadTypeFilters", data.data.results);

        if (data.data.info.next) {
            await dispatch("getAllCharacters", ++page);
        } else {
            commit("filterCharacters");
            commit("loadItems");
        }
    },

    async getAllLocations({ commit, dispatch }, page = 1) {
        const data = await LocationsRepository.getAll(page);

        commit("setLocations", data.data.results);

        if (data.data.info.next) {
            await dispatch("getAllLocations", ++page);
        } else {
            commit("mapAllLocations");
        }
    },

    async getAllEpisodes({ commit, dispatch }, page = 1) {
        const data = await EpisodesRepository.getAll(page);

        commit("setEpisodes", data.data.results);

        if (data.data.info.next) {
            await dispatch("getAllEpisodes", ++page);
        } else {
            commit("mapAllEpisodes");
        }
    },

    filterCharacters({ commit }) {
        commit("filterCharacters");
    },

    setFilter({ commit, state }, { type, filter }) {
        commit("resetData");

        if (state.filters[type].includes(filter)) {
            commit("removeFilter", { type, filter });
        } else {
            commit("setFilter", { type, filter });
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

    setSelectedFilter({ commit }, selected) {
        commit("setSelectedFilter", selected);
    },

    finishLoading({ commit }) {
        commit("finishLoading");
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

    setFilter(state, { type, filter }) {
        state.filters[type].push(filter);
    },

    removeFilter(state, { type, filter }) {
        state.filters[type] = state.filters[type].filter(
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
        state.type = new Set([
            ...state.type,
            ...items.map((item) => item.type),
        ]);
    },

    loadSpeciesFilters(state, items) {
        state.species = new Set([
            ...state.species,
            ...items.map((item) => item.species),
        ]);
    },

    mapAllLocations(state) {
        state.locations = state.locations.map((item) => item.name);
    },

    mapAllEpisodes(state) {
        state.episodes = new Map(
            state.episodes.map((item) => [item.url, item])
        );
    },

    finishLoading(state) {
        state.loading = false;
    },

    setSelectedFilter(state, selected) {
        state.filters.selected = selected;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
