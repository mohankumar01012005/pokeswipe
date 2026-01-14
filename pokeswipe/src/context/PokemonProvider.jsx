import { useReducer } from "react";
import { PokemonContext } from "./PokemonContext";
import { pokemonReducer, initialState } from "./PokemonReducer";

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};
