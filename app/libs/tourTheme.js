import {
  Divider,
  Indicator,
  LoadingOverlay,
  ScrollArea,
  Tooltip,
  createTheme,
} from "@mantine/core";

export const tourTheme = createTheme({
  colorScheme: "light",
  focusRing: "never",
  cursorType: "pointer",
  defaultRadius: "10px",
  autoContrast: true,
  luminanceThreshold: 1,
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        className: "tooltip",
        withArrow: true,
        arrowSize: 10,
        arrowRadius: 3,
        radius: 5,
        openDelay: 0,
        closeDelay: 0,
        events: { hover: true, focus: true, touch: false },
      },
      styles: {
        tooltip: {
          background: "linear-gradient(0deg, #efefef, #ffffff)",
          color: "#444",
        },
      },
    }),
    LoadingOverlay: LoadingOverlay.extend({
      defaultProps: {
        loaderProps: {
          type: "bars",
        },
      },
    }),
    Divider: Divider.extend({
      defaultProps: {
        color: "#fff",
        variant: "solid",
        margins: "xs",
      },
    }),
    ScrollArea: ScrollArea.extend({
      defaultProps: {
        type: "hover",
      },
    }),
    Indicator: Indicator.extend({
      defaultProps: {
        color: "#e23e3e",
        offset: 3,
      },
    }),
  },
});
