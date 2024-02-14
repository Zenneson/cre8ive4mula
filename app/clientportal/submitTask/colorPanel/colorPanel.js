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
  const { choosenType, formData, setFormData } = props;
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [colors, setColors] = useState([]);

  useDidUpdate(() => {
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
      const newColors =
        colors.length === 0
          ? [...formData.colors, selectedColor]
          : [...colors, selectedColor];
      setColors(newColors);
    }
  };

  const colorRow = formData.colors.map((color, index) => {
    const rgb = hexToRgb(color);
    const removeColor = (colorToRemove) => {
      setColors(colors.filter((color) => color !== colorToRemove));
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
            gap={"6.2%"}
            mah={40}
            pl={"20px"}
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
