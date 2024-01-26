"use client";
import { useAppState } from "@libs/store";
import { AppShell, MantineProvider } from "@mantine/core";
import { usePathname } from "next/navigation";
import Clouds from "./clouds/clouds";
import { tourTheme } from "./libs/tourTheme";
import Menu from "./menu/menu";

export default function AppWrapper({ children }) {
  const { mainMenuOpened, setMainMenuOpened } = useAppState();
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

      <MantineProvider defaultColorScheme="light" theme={tourTheme}>
        {pathname !== "/" && (
          <Menu
            mainMenuOpened={mainMenuOpened}
            setMainMenuOpened={setMainMenuOpened}
          />
        )}
        <AppShell pos={"relative"} className={mainMenuOpened && "appPixelated"}>
          {children}
        </AppShell>
        <Clouds />
      </MantineProvider>
    </>
  );
}
