import { Box, Button, Text } from "@mantine/core";
import { useState } from "react";
import classes from "./styles/menu.module.css";
import Switch from "./switch";
import archive from "/public/img/menu/archive.json";
import clientPortal from "/public/img/menu/clientPortal.json";
import fileRepo from "/public/img/menu/fileRepo.json";
import support from "/public/img/menu/support.json";

const MenuBtnItem = ({ animation, text }) => {
  const [play, setPlay] = useState(false);

  return (
    <Button
      className={classes.menuBtn}
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
      justify="flex-start"
      leftSection={
        <div className={play ? classes.shine : classes.grayed}></div>
      }
    >
      <Text>{text}</Text>
    </Button>
  );
};

export default function Menu(props) {
  const { mainMenuOpened, setMainMenuOpened } = props;

  const buttons = [
    {
      text: `Task Dashboard`,
      animation: clientPortal,
    },
    {
      text: "File Repository",
      animation: fileRepo,
    },
    {
      text: "Archive",
      animation: archive,
    },
    {
      text: "Support",
      animation: support,
    },
  ];

  const buttonsList = buttons.map((btn, i) => (
    <MenuBtnItem key={i} text={btn.text} animation={btn.animation} />
  ));

  return (
    <>
      <Switch
        mainMenuOpened={mainMenuOpened}
        setMainMenuOpened={setMainMenuOpened}
      />
      <Box
        className={`${classes.menuCenterFrame} ${
          mainMenuOpened && classes.menuOpened
        }`}
      >
        <Box w={300} h={"100vh"} className={"panel"}>
          {buttonsList}
        </Box>
      </Box>
    </>
  );
}
