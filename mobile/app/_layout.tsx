import { Stack } from "expo-router";
import "../global.css";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AuthSync from "@/components/AuthSync";



const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AuthSync />
      <StatusBar style="light"/>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Stack screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#18181B"
            },
            animation: "fade"
          }} initialRouteName="(auth)">
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="new-chat" options={{
              animation : "slide_from_bottom",
              presentation : "modal",
              gestureEnabled : true,
            }}/>
            <Stack.Screen name="chat/[id]" />
          </Stack>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
