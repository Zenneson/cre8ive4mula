"use client";
import { UserProvider } from "@libs/userContext";
import {
  AppShell,
  ColorSchemeScript,
  MantineProvider,
  ScrollArea,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { usePathname } from "next/navigation";
import Clouds from "./clouds/clouds";
import { tourTheme } from "./libs/tourTheme";

export default function AppWrapper({ children }) {
  const pathname = usePathname();
  const cloudPages =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider forceColorScheme="light" theme={tourTheme}>
        <UserProvider>
          <Notifications position="top-right" zIndex={1000} />
          <AppShell
            pos={"relative"}
            component={ScrollArea}
            type="hover"
            style={{
              position: "fixed",
              width: "100vw",
              height: "100%",
            }}
          >
            {children}
          </AppShell>
          {cloudPages && <Clouds />}
        </UserProvider>
      </MantineProvider>
    </>
  );
}
