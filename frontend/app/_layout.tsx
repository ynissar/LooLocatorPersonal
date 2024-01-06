import { Stack } from "expo-router";
import { WashroomDataProvider } from "../components/MyContext";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function Layout() {
  return (
    <WashroomDataProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="home" />
    </WashroomDataProvider>
  );
}
