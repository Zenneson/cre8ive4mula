import {
  Button,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {} from "react";
import { TypeBtnsCache } from "../page";
import classes from "./styles/chooseTypePanel.module.css";

export default function ChooseTypePanel(props) {
  const { choosenType, serviceBadges, setActivePage } = props;

  return (
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
          <Group justify="center" align="center" w={700} mt={20} gap={15}>
            {serviceBadges}
          </Group>
          <Group justify="flex-end" mt={15}>
            <Button onClick={() => setActivePage(1)}>Continue</Button>
          </Group>
        </>
      )}
    </Stack>
  );
}
