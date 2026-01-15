// ============================================================================
// POKEMON REDUCER - Global State Management
// ============================================================================
// Handles all state mutations for:
// - Liking/unliking Pokemon
// - Theme switching (light/dark mode)
// - Application-wide state updates
// ============================================================================

/**
 * Initial state shape for the Pokemon application
 * @typedef {Object} AppState
 * @property {Array} likedPokemons - Array of liked pokemon objects
 * @property {string} theme - Current theme ("light" or "dark")
 */
export const initialState = {
  likedPokemons: [],
  theme: "light", // light | dark
}

/**
 * Reducer function for handling state mutations
 * @param {AppState} state - Current application state
 * @param {Object} action - Action object with type and payload
 * @returns {AppState} - New state after mutation
 */
export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_POKEMON":
      // Check if pokemon already liked to avoid duplicates
      const isAlreadyLiked = state.likedPokemons.some((p) => p.id === action.payload.id)

      if (isAlreadyLiked) {
        return state // Don't add duplicates
      }

      return {
        ...state,
        likedPokemons: [...state.likedPokemons, action.payload],
      }

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      }

    // Default case returns current state
    default:
      return state
  }
}
