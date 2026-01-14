import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./src/navigation/AppNavigator";
import { PokemonProvider } from "./src/context/PokemonProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PokemonProvider>
    </QueryClientProvider>
  );
}
