"use client";
import "@dotlottie/react-player/dist/index.css";
import {
  Affix,
  Button,
  Center,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { useState } from "react";
import { TypeBtnsCache } from "../page";
import classes from "./styles/submitTask.module.css";

export default function SubmitTask() {
  const [activePage, setActivePage] = useState(0);
  const [choosenType, setChoosenType] = useSessionStorage({
    key: "submitData",
    defaultValue: null,
  });

  const submitPage = () => {
    switch (activePage) {
      case 0:
        return "0px";
      case 1:
        return "-100vw";
      case 2:
        return "-200vw";
      case 3:
        return "-300vw";
      case 4:
        return "-400vw";
      case 5:
        return "-500vw";
      default:
        return "0px";
    }
  };

  return (
    <Group className={classes.centerFrame} left={submitPage()} gap={"0px"}>
      <Affix position={{ top: 30, right: 30 }}>
        <Button.Group className={classes.nextPrev}>
          <Button
            onClick={() =>
              setActivePage((current) => (current > 0 ? current - 1 : current))
            }
          >
            Prev
          </Button>
          <Button
            onClick={() =>
              setActivePage((current) => (current < 2 ? current + 1 : current))
            }
          >
            Next
          </Button>
        </Button.Group>
      </Affix>

      <Center id="0" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Stack pt={200} gap={5}>
          <Group className={classes.chooseTypeTitle} gap="7">
            <Image
              src={"/img/task.svg"}
              alt={"Task Type"}
              height={25}
              opacity={0.5}
            />
            <Title order={4}>Task Type:</Title>
          </Group>
          <SimpleGrid cols={3} spacing={"xl"}>
            <TypeBtnsCache />
          </SimpleGrid>
          {choosenType && (
            <>
              <Grid className={`panel ${classes.typeDescFrame}`}>
                <Grid.Col span="content">
                  <Title tt={"uppercase"} order={2}>
                    {choosenType.title}
                  </Title>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Text>{choosenType.desc}</Text>
                </Grid.Col>
              </Grid>
              <Group justify="flex-end" mt={15}>
                <Button onClick={() => setActivePage(1)}>Continue</Button>
              </Group>
            </>
          )}
        </Stack>
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Task Details</Text>
      </Center>
      <Center id="2" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Review Details</Text>
      </Center>
    </Group>
  );
}
