import {
  Divider,
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
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        className: "tooltip",
        withArrow: true,
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
