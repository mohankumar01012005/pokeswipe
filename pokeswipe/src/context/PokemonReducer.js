export const initialState = {
  likedPokemons: [],
};

// Handles global state updates
export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_POKEMON":
      return {
        ...state,
        likedPokemons: [...state.likedPokemons, action.payload],
      };

    default:
      return state;
  }
};
