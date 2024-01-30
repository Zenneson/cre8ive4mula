import {
  Divider,
  LoadingOverlay,
  ScrollArea,
  Tooltip,
  createTheme,
} from "@mantine/core";

export const tourTheme = createTheme({
  colorScheme: "dark",
  focusRing: "never",
  cursorType: "pointer",
  defaultRadius: "10px",
  autoContrast: true,
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        className: "tooltip",
        withArrow: true,
        arrowSize: 10,
        arrowRadius: 3,
        radius: 5,
        openDelay: 1500,
        closeDelay: 0,
        events: { hover: true, focus: true, touch: false },
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
  },
});
