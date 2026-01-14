import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// Fetches one random Pokémon and normalizes data for UI usage
export const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 150) + 1;

  const response = await axios.get(`${BASE_URL}/${randomId}`);
  const data = response.data;

  return {
    id: data.id,
    name: data.name.toUpperCase(),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`,
    abilities: data.abilities.map((a) => a.ability.name),
    types: data.types.map((t) => t.type.name),
  };
};
