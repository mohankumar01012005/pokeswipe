import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonProvider } from "./src/context/PokemonProvider";
import AppNavigator from "./src/navigation/AppNavigator";

const queryClient = new QueryClient();

// Root app component
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
