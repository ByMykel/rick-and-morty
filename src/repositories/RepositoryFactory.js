import CharactersRepository from "./CharactersRepository";
import EpisodesRepository from "./EpisodesRepository";

const repositories = {
  characters: CharactersRepository,
  episodes: EpisodesRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
