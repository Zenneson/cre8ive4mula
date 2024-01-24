import { Burger, Button, Center } from "@mantine/core";
import classes from "./styles/menu.module.css";

export default function Menu(props) {
  const { mainMenuOpened, setMainMenuOpened } = props;

  return (
    <>
      <Burger
        className={classes.menuBtn}
        opened={mainMenuOpened}
        size={"xl"}
        color={"#fff"}
        onClick={() => setMainMenuOpened(!mainMenuOpened)}
      />
      <Center
        className={`${classes.menuCenterFrame} ${
          mainMenuOpened && classes.menuOpened
        }`}
      >
        <Button>Menu</Button>
      </Center>
    </>
  );
}
