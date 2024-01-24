import { Burger, Button, Center, Group, Stack, Text } from "@mantine/core";
import classes from "./styles/menu.module.css";

export default function Menu(props) {
  const { mainMenuOpened, setMainMenuOpened } = props;

  return (
    <>
      <Burger
        className={classes.menuBurger}
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
        <Stack gap={20} className="panel" p={20}>
          <Group justify="space-between">
            <Text className={classes.menuTitle}>Cre8ive 4mula</Text>
          </Group>
          <Group gap={20}>
            <Button className={classes.menuBtnWide}>Menu</Button>
            <Button className={classes.menuBtn}>Menu</Button>
          </Group>
          <Group gap={20}>
            <Button className={classes.menuBtn}>Menu</Button>
            <Button className={classes.menuBtn}>Menu</Button>
            <Button className={classes.menuBtn}>Menu</Button>
          </Group>
        </Stack>
      </Center>
    </>
  );
}
