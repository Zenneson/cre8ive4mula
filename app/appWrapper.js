"use client";
import { AppShell, MantineProvider } from "@mantine/core";
import { tourTheme } from "./libs/tourTheme";

export default function AppWrapper({ children }) {
  return (
    <MantineProvider defaultColorScheme="light" theme={tourTheme}>
      <AppShell>{children}</AppShell>
    </MantineProvider>
  );
}
