// Ensures that a given string starts with a specified symbol.
export const addAtSymbol = (inputStr, symbol) => {
  if (!inputStr) return;

  if (typeof inputStr === "string") {
    if (!inputStr.startsWith(symbol)) {
      return symbol + inputStr;
    }
    return inputStr;
  }
};

// Returns a color based on the type of task.
export const taskColor = (type) => {
  switch (type) {
    case "Design":
      return "#f66345";
    case "Content":
      return "#f80800";
    case "Web Dev":
      return "#ffd941";
    default:
      return "#f66345";
  }
};
