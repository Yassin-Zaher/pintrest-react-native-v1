import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NhostClient,NhostReactProvider, useNhostClient } from "@nhost/react";
import * as SecureStorage from "expo-secure-store";
import * as SecureStore from "expo-secure-store";

window = undefined;

const nhost = new NhostClient({
  
    backendUrl: 'https://gfkuoxmfqcmbdlclyiuc.nhost.run', 
    clientStorageType: "expo-secure-storage",
    clientStorage: SecureStore,
  
})

export default function App() {
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NhostReactProvider nhost={nhost}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />

          <StatusBar />
        </SafeAreaProvider>
     </NhostReactProvider>
    );
  }
}
