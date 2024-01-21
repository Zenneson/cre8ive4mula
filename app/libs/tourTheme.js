import { createTheme } from "@mantine/core";

export const tourTheme = createTheme({
  colorScheme: "light",
  focusRing: "never",
  cursorType: "pointer",
  components: {
    Tooltip: {
      defaultProps: {
        className: "tooltip",
        withArrow: true,
        openDelay: 1500,
        closeDelay: 0,
        events: { hover: true, focus: true, touch: false },
      },
    },
    LoadingOverlay: {
      classNames: {
        root: "loadingOverlayDefault",
        loader: "loadingOverlayDefaultLoader",
      },
      defaultProps: {
        loaderProps: {
          type: "bars",
        },
      },
    },
  },
});
