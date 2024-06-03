import { useSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./root";

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}
