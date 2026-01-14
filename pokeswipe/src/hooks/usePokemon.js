import { useQuery } from "@tanstack/react-query";
import { fetchRandomPokemon } from "../api/pokemonApi";

export const usePokemon = () => {
  return useQuery({
    queryKey: ["randomPokemon"],
    queryFn: fetchRandomPokemon,
    retry: 2,
  });
};
