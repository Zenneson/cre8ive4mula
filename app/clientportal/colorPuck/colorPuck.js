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
            h={isTaskFrom ? 60 : 40}
            bg={color}
          />
          <Stack className={classes.hoverCardInfo} c={"#000"} gap={0}>
            <Text fz={13} tt={"uppercase"}>
              {color}
            </Text>
            <Text fz={13}>
              RGB ( {rgb.r}, {rgb.g}, {rgb.b} )
            </Text>
            {isTaskFrom && (
              <Badge
                className={classes.removeColorBtn}
                fullWidth
                variant="filled"
                color="red.7"
                c={"#fff"}
                mt={3}
                onClick={() => removeColor(color)}
              >
                <Group gap={5} align="center">
                  <FaCut /> Remove
                </Group>
              </Badge>
            )}
          </Stack>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
