import {
  Divider,
  Indicator,
  LoadingOverlay,
  ScrollArea,
  Tooltip,
  createTheme,
} from "@mantine/core";

export const tourTheme = createTheme({
  white: "#fff",
  black: "#000",
  colorScheme: "light",
  focusRing: "never",
  cursorType: "pointer",
  defaultRadius: "10px",
  autoContrast: true,
  colors: {
    deepred: [
      "#ffe9f0",
      "#ffd0dd",
      "#fd9db8",
      "#fc6791",
      "#fb3d70",
      "#fb255b",
      "#fc1851",
      "#e10c42",
      "#c9003a",
      "#b00031",
    ],
    deeporange: [
      "#ffede5",
      "#ffdace",
      "#fcb49f",
      "#f88d6b",
      "#f56a40",
      "#f35424",
      "#f34815",
      "#d83908",
      "#c23004",
      "#aa2500",
    ],
  },
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
