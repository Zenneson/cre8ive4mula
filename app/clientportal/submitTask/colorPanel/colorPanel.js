"use client";
import { addAtSymbol, hexToRgb } from "@libs/custom";
import {
  ActionIcon,
  Box,
  Button,
  ColorPicker,
  Flex,
  Grid,
  Group,
  Input,
  Popover,
  Text,
} from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuPaintBucket } from "react-icons/lu";
import ColorPuck from "../../colorPuck/colorPuck";
import classes from "./styles/colorPanel.module.css";

export default function ColorPanel(props) {
  const { form, colors, setColors } = props;
  const [selectedColor, setSelectedColor] = useState("#FF0000");

  useDidUpdate(() => {
    form.setFieldValue("colors", colors);
  }, [colors, form.values.colors]);

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
        message: "The hex value given is invalid.",
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
      const newColors =
        colors.length === 0
          ? [...form.values.colors, selectedColor]
          : [...colors, selectedColor];
      setColors("colors", newColors);
    }
  };

  const colorRow = form.values.colors?.map((color, index) => {
    const rgb = hexToRgb(color);
    const removeColor = (colorToRemove) => {
      setColors(
        "colors",
        colors.filter((color) => color !== colorToRemove)
      );
    };

    return (
      <ColorPuck
        key={index}
        color={color}
        removeColor={removeColor}
        isTaskFrom={true}
        rgb={rgb}
      />
    );
  });

  return (
    <Box>
      <Grid gutter={20}>
        <Grid.Col span="2.6">
          <Popover
            disabled={colors.length === 10}
            position="top"
            width="200px"
            py={10}
          >
            <Popover.Target>
              <Button
                h={45}
                w={"100%"}
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
            justify={colors.length < 10 ? "flex-start" : "space-between"}
            align={"center"}
            gap={"6.2%"}
            h={45}
            py={15}
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
