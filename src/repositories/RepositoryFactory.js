import CharactersRepository from "./CharactersRepository";
import EpisodesRepository from "./EpisodesRepository";
import LocationsRepository from "./LocationsRepository";

const repositories = {
  characters: CharactersRepository,
  episodes: EpisodesRepository,
  locations: LocationsRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
