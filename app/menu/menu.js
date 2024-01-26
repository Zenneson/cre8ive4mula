import { Button, Center, Flex, Group, Stack, Title } from "@mantine/core";
import { useState } from "react";
import Lottie from "react-lottie";
import classes from "./styles/menu.module.css";
import Switch from "./switch";
import archive from "/public/img/menu/archive.json";
import clientPortal from "/public/img/menu/clientPortal.json";
import fileRepo from "/public/img/menu/fileRepo.json";
import submitTask from "/public/img/menu/submitTask.json";
import support from "/public/img/menu/support.json";

const MenuBtnItem = ({ animation, text }) => {
  const [play, setPlay] = useState(false);

  console.log("🚀 ~ MenuBtnItem ~ play:", play);

  return (
    <Button
      className={`${
        text === "Client Portal" ? classes.menuBtnWide : classes.menuBtn
      }`}
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Flex
        direction={text === "Client Portal" ? "Row" : "Column"}
        align={"center"}
        justify={"center"}
        gap={5}
      >
        <div className={play ? classes.shine : classes.grayed}>
          <Lottie
            options={{
              animationData: animation,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            isStopped={!play}
            height={text === "Client Portal" ? 150 : 100}
            width={text === "Client Portal" ? 150 : 100}
          />
        </div>
        <Title
          className={classes.btnText}
          tt={"capitalize"}
          h={text === "Client Portal" ? 20 : "auto"}
          fw={400}
          fz={text === "Client Portal" ? 18 : 12}
        >
          {text}
        </Title>
      </Flex>
    </Button>
  );
};

export default function Menu(props) {
  const { mainMenuOpened, setMainMenuOpened } = props;

  const buttons = [
    {
      row: [
        {
          text: `Client Portal`,
          animation: clientPortal,
        },
        {
          text: "Submit Task",
          animation: submitTask,
        },
      ],
    },
    {
      row: [
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
      ],
    },
  ];

  const buttonsList = buttons.map((list, i) => (
    <Group key={i} gap={20}>
      {list.row.map((btn, i) => (
        <MenuBtnItem key={i} animation={btn.animation} text={btn.text} />
      ))}
    </Group>
  ));

  return (
    <>
      <Switch
        mainMenuOpened={mainMenuOpened}
        setMainMenuOpened={setMainMenuOpened}
      />
      <Center
        className={`${classes.menuCenterFrame} ${
          mainMenuOpened && classes.menuOpened
        }`}
      >
        <Stack gap={20} className="panel" p={20}>
          {buttonsList[0]}
          {buttonsList[1]}
        </Stack>
      </Center>
    </>
  );
}
