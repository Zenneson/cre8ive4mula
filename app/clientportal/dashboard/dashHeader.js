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
  const { setActive } = props;

  return (
    <Group justify="space-between" mb={"2px"}>
      <Stack gap={0}>
        <Flex align={"center"} gap={10}>
          <Title fz={32} tt={"uppercase"}>
            Sheaperd&rsquo;s Valley, LLC
          </Title>
          <Badge size="md">Pro</Badge>
        </Flex>
        <Text mt={-8} fz={12} tt={"uppercase"}>
          Task Dashboard
        </Text>
      </Stack>

      <Stack gap={0} align="flex-end">
        <Tooltip
          position={"bottom"}
          withArrow
          label={"Account Settings"}
          openDelay={0}
          offset={5}
        >
          <Badge
            className={classes.userBadge}
            variant="light"
            color={"#fff"}
            size="md"
            tt={"inherit"}
            onClick={() => setActive(4)}
          >
            useremail@gmail.com
          </Badge>
        </Tooltip>
        <Group gap={0}>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Submit Task"}
            openDelay={0}
            offset={-3}
          >
            <ActionIcon
              size="xl"
              variant="transparent"
              className={classes.topRightBtns}
              onClick={() => setActive(1)}
            >
              <Image
                src={"/img/menu/submitTask.svg"}
                alt={"Submit Task"}
                height={25}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Task Archive"}
            openDelay={0}
            offset={-3}
          >
            <ActionIcon
              size="xl"
              variant="transparent"
              className={classes.topRightBtns}
              onClick={() => setActive(2)}
            >
              <Image
                src={"/img/menu/taskArchive.svg"}
                alt={"Task Archive"}
                height={25}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"File Repository"}
            openDelay={0}
            offset={-3}
          >
            <ActionIcon
              size="xl"
              variant="transparent"
              className={classes.topRightBtns}
              onClick={() => setActive(3)}
            >
              <Image
                src={"/img/menu/fileRepo.svg"}
                alt={"File Repository"}
                height={25}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Group>
  );
}
