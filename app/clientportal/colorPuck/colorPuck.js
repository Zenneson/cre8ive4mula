"use client";
import {
  Badge,
  Box,
  ColorSwatch,
  Group,
  HoverCard,
  Stack,
  Text,
} from "@mantine/core";
import { FaCut } from "react-icons/fa";
import classes from "./styles/colorPuck.module.css";

export default function ColorPuck(props) {
  const { color, index, rgb, removeColor, isTaskFrom } = props;

  return (
    <HoverCard
      key={index}
      position="top"
      shadow="md"
      openDelay={0}
      closeDelay={0}
      arrowSize={10}
      withArrow
      withinPortal={isTaskFrom}
    >
      <HoverCard.Target>
        <ColorSwatch className={classes.colorCircle} color={color} size={23} />
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Group gap={0}>
          <Box
            className={classes.hoverCardColor}
            h={isTaskFrom ? 65 : 40}
            bg={color}
          />
          <Stack className={classes.hoverCardInfo} c={"#000"} gap={0}>
            <Text fw={700} fz={15} tt={"uppercase"}>
              {color}
            </Text>
            <Text fz={12}>
              RGB ( {rgb.r}, {rgb.g}, {rgb.b} )
            </Text>
            {isTaskFrom && (
              <Badge
                className={classes.removeColorBtn}
                fullWidth
                variant="filled"
                c="red.7"
                mt={5}
                onClick={() => removeColor(color)}
              >
                <Group gap={5} align="center">
                  <FaCut />{" "}
                  <Text fw={700} fz={11}>
                    Remove
                  </Text>
                </Group>
              </Badge>
            )}
          </Stack>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
