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
import TypeBtns from "./typeBtns/typeBtns";

export default function ChooseTypePanel(props) {
  const { types, taskType, setupData, setSubmissionPanel, titleRef } = props;

  const serviceList = setupData?.services;
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
    <Stack mih={"700px"} gap={10}>
      <Group className={classes.chooseTypeTitleFrame} gap="7">
        <Image
          src={"/img/clientDashboard/submit/addTask.svg"}
          alt={"Task Type"}
          height={25}
          opacity={0.5}
        />
        <Title mt={3} order={4}>
          Task Type
        </Title>
      </Group>
      <SimpleGrid cols={3} spacing={20}>
        <TypeBtns types={types} />
      </SimpleGrid>
      <Transition mounted={taskType} transition="scale-y" timingFunction="ease">
        {(styles) => (
          <Box style={styles}>
            <Grid className={`panel ${classes.typeDescFrame}`}>
              <Grid.Col span="content">
                <Title tt={"uppercase"} order={4}>
                  {taskType}
                </Title>
              </Grid.Col>
              <Grid.Col span="auto">
                <Text ta={"justify"} lh={1.4}>
                  {setupData?.desc}
                </Text>
              </Grid.Col>
            </Grid>
            <Group className={`panel ${classes.serviceBadgesFrame}`}>
              {serviceBadges}
            </Group>
            <Group justify="flex-end" mt={20}>
              <Button rightSection={<FaPlay size={8} />} onClick={goToForm}>
                Continue
              </Button>
            </Group>
          </Box>
        )}
      </Transition>
    </Stack>
  );
}
