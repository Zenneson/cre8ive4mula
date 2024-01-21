"use client";
import { AppShell, MantineProvider } from "@mantine/core";
import { tourTheme } from "./libs/tourTheme";
import NumbersBg from "./numbersBg/numbersBg";

export default function AppWrapper({ children }) {
  return (
    <MantineProvider defaultColorScheme="light" theme={tourTheme}>
      <AppShell pos={"fixed"} w={"100vw"} h={"100vh"}>
        {children}
      </AppShell>
      <NumbersBg />
    </MantineProvider>
  );
}
