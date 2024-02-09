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
  Input,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { FaCut } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuPaintBucket } from "react-icons/lu";
import classes from "./styles/colorPanel.module.css";

export default function ColorPanel(props) {
  const { choosenType, setFormData } = props;
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setFormData({ colors: colors });
  }, [colors, setFormData]);

  const addColor = () => {
    if (!hexToRgb(selectedColor)) {
      return showNotification({
        title: (
          <Group gap={10} opacity={0.25}>
            <LuPaintBucket size={15} />
            <Text fz={11} fw={700} tt={"uppercase"}>
              Invalid Color
            </Text>
          </Group>
        ),
        message: "Thex hex value given is invalid.",
        color: "red",
      });
    }
    if (colors.includes(selectedColor)) {
      return showNotification({
        title: (
          <Group gap={10} opacity={0.25}>
            <LuPaintBucket size={15} />
            <Text fz={11} fw={700} tt={"uppercase"}>
              Already Added
            </Text>
          </Group>
        ),
        message: "This color has already been added.",
        color: selectedColor,
      });
    }
    if (selectedColor !== "" && !colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
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
          <ColorSwatch
            className={classes.colorCircle}
            color={color}
            size={23}
          />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group gap={0}>
            <Box className={classes.hoverCardColor} bg={color} />
            <Stack className={classes.hoverCardInfo} c={"#000"} gap={0}>
              <Text fz={13} tt={"uppercase"}>
                {color}
              </Text>
              <Text fz={13}>
                RGB ( {rgb.r}, {rgb.g}, {rgb.b} )
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
                <Group gap={5} align="center">
                  <FaCut /> Remove
                </Group>
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
                {colors.length === 0 ? "Add" : ""} Colors
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <ColorPicker
                size="sm"
                fullWidth
                value={selectedColor}
                onChange={(event) => {
                  setSelectedColor(event);
                }}
                classNames={{
                  saturationOverlay: classes.pickerArea,
                  sliderOverlay: classes.pickerSlider,
                }}
              />
              <Input
                classNames={{
                  wrapper: classes.colorInputWrapper,
                  input: classes.colorInput,
                }}
                value={addAtSymbol(selectedColor, "#")}
                onChange={(event) => {
                  const hex = event.currentTarget.value;
                  setSelectedColor(hex);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addColor();
                  }
                }}
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
            gap={33.5}
            mah={40}
          >
            {colorRow}
            {colorRow.length < 8 && (
              <Group gap={10} opacity={0.25}>
                <LuPaintBucket size={15} />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Colors Added
                </Text>
              </Group>
            )}
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
