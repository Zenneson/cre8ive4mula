"use client";
import {
  ActionIcon,
  Badge,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import classes from "./styles/dashboard.module.css";

export default function DashHeader(props) {
  const { setActivePanel } = props;

  return (
    <Group justify="space-between" mb={"2px"} pr={13} pl={125}>
      <Stack gap={0}>
        <Flex align={"center"} gap={10}>
          <Title className={classes.companyName}>
            Sheaperd&rsquo;s Valley, LLC
          </Title>
          <Badge size="md">Pro</Badge>
        </Flex>
        <Text mt={-8} fz={12} c={"#fff"} tt={"uppercase"}>
          Task Dashboard
        </Text>
      </Stack>

      <Stack gap={0} align="flex-end">
        <Tooltip
          position={"bottom"}
          withArrow
          label={"Account Settings"}
          offset={5}
        >
          <Badge
            className={classes.userBadge}
            variant="light"
            color={"#fff"}
            size="md"
            tt={"inherit"}
            onClick={() => setActivePanel(3)}
          >
            useremail@gmail.com
          </Badge>
        </Tooltip>
        <Group gap={0}>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Submit Task"}
            offset={-3}
          >
            <ActionIcon
              size="xl"
              variant="transparent"
              className={classes.topRightBtns}
              onClick={() => setActivePanel(1)}
            >
              <Image
                src={"/img/menu/submitTask.svg"}
                alt={"Submit Task"}
                height={25}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip position={"bottom"} withArrow label={"Archive"} offset={-3}>
            <ActionIcon
              size="xl"
              variant="transparent"
              className={classes.topRightBtns}
              onClick={() => setActivePanel(2)}
            >
              <Image
                src={"/img/menu/fileRepo.svg"}
                alt={"Archive"}
                height={25}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Group>
  );
}
