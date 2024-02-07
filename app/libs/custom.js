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
      return "deeporange.5";
    case "Content":
      return "deepred.6";
    case "Web Dev":
      return "#ffd941";
    default:
      return "#F5454A";
  }
};

// Returns a 6 character random ID.
export const generateId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// Returns the current scroll position of a given element.
export const checkScrollPosition = (ref) => {
  if (!ref.current) {
    return;
  }

  const element = ref.current;
  const hasYAxisScrollbar = element.scrollHeight > element.clientHeight;

  if (!hasYAxisScrollbar) {
    return false;
  }

  const isAtTop = element.scrollTop === 0;
  const isAtBottom =
    element.scrollTop + element.clientHeight === element.scrollHeight;

  if (isAtTop) {
    return "top";
  } else if (isAtBottom) {
    return "bottom";
  } else {
    return "middle";
  }
};

// Allows for smooth scrolling when hovering over the edge of a scrollable element.
export const scrollToward = {
  interval: null,
  scrollSpeed: 2.5, // Adjust scroll speed as needed

  start: function (frameRef, direction, scrollSpot) {
    const sp = checkScrollPosition(frameRef);
    const step = direction === "up" ? -this.scrollSpeed : this.scrollSpeed;
    this.interval = setInterval(() => {
      if (frameRef.current) {
        frameRef.current.scrollTop += step;
      }
    }, 10); // Adjust interval timing for smoother or faster scrolling
    if (scrollSpot === sp) {
      clearInterval(this.interval);
    }
  },

  stop: function () {
    clearInterval(this.interval);
  },
};

// Checks all valies in am object and returns true if all are false.
export const allValuesFalse = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== false) {
      return false;
    }
  }
  return true;
};

// Removes the last item from an array.
export const removeLastItem = (arr) => {
  if (arr && arr.length > 0) {
    arr.pop();
  }
  return arr;
};
