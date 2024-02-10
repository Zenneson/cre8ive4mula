"use client";
import {
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { FaPlay } from "react-icons/fa";
import classes from "./styles/chooseTypePanel.module.css";
import TypeBtns from "./typeBtns";

export default function ChooseTypePanel(props) {
  const { setupData, choosenType, setSubmissionPanel, titleRef } = props;

  const serviceList = setupData?.service;
  const serviceBadges = serviceList?.map((service, i) => {
    return (
      <Badge
        key={i}
        className={classes.serviceBadges}
        color={setupData.color}
        size={"xs"}
        variant="filled"
      >
        {service}
      </Badge>
    );
  });

  const goToForm = () => {
    titleRef.current.focus();
    setSubmissionPanel(1);
  };

  return (
    <Stack mih={"700px"} gap={5}>
      <Group className={classes.chooseTypeTitleFrame} gap="7">
        <Image
          src={"/img/task.svg"}
          alt={"Task Type"}
          height={25}
          opacity={0.5}
        />
        <Title order={4}>Task Type</Title>
      </Group>
      <SimpleGrid cols={3} spacing={20}>
        <TypeBtns />
      </SimpleGrid>
      <Transition
        mounted={choosenType && choosenType.title}
        transition="scale-y"
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
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
            <Group className={`panel ${classes.serviceBadgesFrame}`}>
              {serviceBadges}
            </Group>
            <Group justify="flex-end" mt={20}>
              <Button leftSection={<FaPlay size={10} />} onClick={goToForm}>
                Continue
              </Button>
            </Group>
          </Box>
        )}
      </Transition>
    </Stack>
  );
}
