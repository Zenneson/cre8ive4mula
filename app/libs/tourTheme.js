import {
  Divider,
  Drawer,
  Indicator,
  Input,
  NumberInput,
  PasswordInput,
  ScrollArea,
  Select,
  TagsInput,
  TextInput,
  Textarea,
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
  primaryColor: "cobaltblue",
  autoContrast: true,
  primaryShade: 9,
  colors: {
    deepblue: [
      "#e4f5ff",
      "#cde5ff",
      "#9bc8ff",
      "#64aaff",
      "#3990fe",
      "#1e80fe",
      "#0978ff",
      "#0066e4",
      "#005acd",
      "#004eb5",
    ],
    cobaltblue: [
      "#ebf3ff",
      "#d4e3f9",
      "#a3c4f6",
      "#70a3f4",
      "#4a87f3",
      "#3676f2",
      "#2b6df4",
      "#215cd9",
      "#1852c2",
      "#0246ab",
    ],
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
    Drawer: Drawer.extend({
      defaultProps: {
        withCloseButton: false,
        transitionProps: { duration: 300, timingFunction: "ease" },
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
    }),
    Input: Input.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
    }),
    TagsInput: TagsInput.extend({
      defaultProps: {
        classNames: {
          wrapper: "inputWrapper",
          input: "chatInput",
        },
      },
      styles: {
        input: {
          paddingTop: 13,
        },
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        className: "tooltip",
        arrowSize: 10,
        arrowRadius: 3,
        radius: 5,
        openDelay: 0,
        closeDelay: 0,
        zIndex: 1000,
        events: { hover: true, focus: true, touch: false },
      },
      styles: {
        tooltip: {
          background: "linear-gradient(0deg, #efefef, #ffffff)",
          color: "#444",
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
