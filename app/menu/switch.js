import { Box } from "@mantine/core";
import {} from "react";
import classes from "./styles/menu.module.css";

export default function Switch(props) {
  const { mainMenuOpened, setMainMenuOpened } = props;

  return (
    <Box>
      <Box
        className={classes.switchOverlay}
        onClick={() => setMainMenuOpened(!mainMenuOpened)}
      />
      <label className={classes.switch}>
        <input type="checkbox" checked={mainMenuOpened} readOnly={true} />
        <div className={classes.button}>
          <div className={classes.light} />
          <div className={classes.dots} />
          <div className={classes.characters} />
          <div className={classes.shine} />
          <div className={classes.shadow} />
        </div>
      </label>
    </Box>
  );
}
