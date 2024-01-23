"use client";
import { AppShell, MantineProvider } from "@mantine/core";
import NumbersBg from "./dotsBg/dotsBg";
import { tourTheme } from "./libs/tourTheme";

export default function AppWrapper({ children }) {
  return (
    <MantineProvider defaultColorScheme="light" theme={tourTheme}>
      <AppShell>{children}</AppShell>

      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* <filter id="pixelFilter"> */}
          <filter>
            <feFlood x="6" y="6" height="1" width="1" />
            <feComposite width="4" height="5" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius={15} />
          </filter>
        </defs>
      </svg>

      <NumbersBg />
    </MantineProvider>
  );
}
