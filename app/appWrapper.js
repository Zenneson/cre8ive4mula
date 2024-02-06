"use client";
import {
  AppShell,
  ColorSchemeScript,
  MantineProvider,
  ScrollArea,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import Clouds from "./clouds/clouds";
import { tourTheme } from "./libs/tourTheme";

export default function AppWrapper({ children }) {
  const pathname = usePathname();

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={"pixel"}>
            <feFlood x="4" y="6" height="1" width="1" />
            <feComposite width="4" height="5" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius={2} />
          </filter>
        </defs>
      </svg>

      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider forceColorScheme="light" theme={tourTheme}>
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
        {(pathname === "/" || pathname === "/login") && <Clouds />}
      </MantineProvider>
    </>
  );
}
