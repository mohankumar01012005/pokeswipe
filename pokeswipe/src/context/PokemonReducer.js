export const initialState = {
  likedPokemons: [],
  theme: "light", // light | dark
};

// Handles global Pokémon state updates
export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_POKEMON":
      return {
        ...state,
        likedPokemons: [...state.likedPokemons, action.payload],
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    default:
      return state;
  }
};
