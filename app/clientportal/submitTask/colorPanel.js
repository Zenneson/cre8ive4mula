"use client";
import { addAtSymbol, hexToRgb } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  ColorPicker,
  ColorSwatch,
  Flex,
  Grid,
  Group,
  HoverCard,
  Popover,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuPaintBucket } from "react-icons/lu";
import classes from "./styles/colorPanel.module.css";

export default function ColorPanel(props) {
  const { choosenType } = props;
  const [selectedColor, setSelectedColor] = useDebouncedState("#0000FF", 200);
  const [colors, setColors] = useState([]);

  const addColor = () => {
    if (selectedColor !== "" && !colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
      setSelectedColor("#0000FF");
      return;
    }
    if (colors.includes(selectedColor)) {
      showNotification({
        title: (
          <Group gap={10} opacity={0.25}>
            <LuPaintBucket size={15} />
            <Text fz={11} fw={700} tt={"uppercase"}>
              Already Added
            </Text>
          </Group>
        ),
        message: "This color is already added",
        color: selectedColor,
      });
    }
  };

  const colorRow = colors.map((color, index) => {
    const rgb = hexToRgb(color);
    const removeColor = (colorToRemove) => {
      setColors(colors.filter((color) => color !== colorToRemove));
    };

    return (
      <HoverCard
        key={index}
        position="top"
        shadow="md"
        openDelay={0}
        closeDelay={0}
        withArrow
      >
        <HoverCard.Target>
          <ColorSwatch color={color} size={20} />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Box className={classes.hoverCardColor} bg={color} />
            <Stack c={"#000"} gap={0}>
              <Text fz={13} tt={"uppercase"}>
                {color}
              </Text>
              <Text fz={13}>
                RGBA ( {rgb.r}, {rgb.g}, {rgb.b} )
              </Text>
              <Badge
                className={classes.removeColorBtn}
                fullWidth
                variant="filled"
                color="red.7"
                c={"#fff"}
                mt={3}
                onClick={() => removeColor(color)}
              >
                Remove
              </Badge>
            </Stack>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  });

  return (
    <Box hidden={choosenType?.title !== "Design"}>
      <Grid gutter={20} className="innerPanel" p={20}>
        <Grid.Col span="3">
          <Popover
            disabled={colors.length === 10}
            position="top"
            width="target"
            py={10}
          >
            <Popover.Target>
              <Button
                h={40}
                w={"100%"}
                className={colors.length === 10 && classes.noPointerEvents}
                leftSection={
                  colors.length === 0 ? (
                    <HiOutlineColorSwatch size={18} />
                  ) : (
                    `${colors.length} / 10`
                  )
                }
              >
                Add Colors
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <ColorPicker
                size="sm"
                fullWidth
                value={selectedColor}
                onChange={setSelectedColor}
                classNames={{
                  saturationOverlay: classes.pickerArea,
                  sliderOverlay: classes.pickerSlider,
                }}
              />
              <TextInput
                classNames={{
                  wrapper: classes.colorInputWrapper,
                  input: classes.colorInput,
                }}
                value={addAtSymbol(selectedColor, "#")}
                onChange={(event) =>
                  setSelectedColor(event.currentTarget.value)
                }
                maxLength={7}
                rightSectionPointerEvents="all"
                rightSection={
                  <ActionIcon
                    className={classes.addColorBtn}
                    variant="subtle"
                    color="#777"
                    onClick={addColor}
                  >
                    <FaCirclePlus size={30} />
                  </ActionIcon>
                }
              />
            </Popover.Dropdown>
          </Popover>
        </Grid.Col>
        <Grid.Col span="auto">
          <Flex
            className="altPanel"
            justify={"flex-start"}
            align={"center"}
            gap={37}
            mah={40}
          >
            {colorRow.length === 0 ? (
              <Group gap={10} opacity={0.25}>
                <LuPaintBucket size={15} />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Colors Added
                </Text>
              </Group>
            ) : (
              colorRow
            )}
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
