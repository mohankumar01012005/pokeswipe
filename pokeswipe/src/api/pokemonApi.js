import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

/**
 * Fetch a random Pokémon and normalize data
 */
export const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 150) + 1;

  console.log("📡 Fetching Pokémon with ID:", randomId);

  const response = await axios.get(`${BASE_URL}/${randomId}`);

  console.log("✅ Raw API Response:", response.data);

  const normalizedPokemon = {
    id: response.data.id,
    name: response.data.name.toUpperCase(),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${response.data.id}.svg`,
    abilities: response.data.abilities.map(
      (item) => item.ability.name
    ),
    types: response.data.types.map((item) => item.type.name),
  };

  console.log("🔄 Normalized Pokémon:", normalizedPokemon);

  return normalizedPokemon;
};
