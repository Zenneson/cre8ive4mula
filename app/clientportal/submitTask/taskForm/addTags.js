"use client";
import {
  ActionIcon,
  Box,
  CloseButton,
  Group,
  Image,
  Input,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { shallowEqual, useClickOutside, useFocusWithin } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import { FaCut, FaPlus } from "react-icons/fa";
import { TbHelpSquareFilled } from "react-icons/tb";
import { usePortalState, useSubissionData } from "../../portalStore";
import classes from "./styles/taskFrom.module.css";

export default function AddTags(props) {
  const { placeholder, mode, tabIndex, icon } = props;
  const { helpMode, setHelpMode, deliverInfo, setDeliverInfo } =
    usePortalState();
  const {
    styleKeywords,
    setStyleKeywords,
    deliveryFormats,
    setDeliveryFormats,
    websites,
    setWebsites,
  } = useSubissionData();

  const { ref, focused } = useFocusWithin();
  const popoverDropdownRef = useClickOutside(() => setHoveringPopover(false));
  const [inputValue, setInputValue] = useState("");
  const [hoveringPopover, setHoveringPopover] = useState(false);

  const styleKeywordsRef = useRef(null);
  const deliveryFormatsRef = useRef(null);
  const websitesRef = useRef(null);

  const valueMode = (mode) => {
    let handler = {};
    if (mode === "styleKeywords") {
      handler.var = styleKeywords;
      handler.setter = setStyleKeywords;
      handler.ref = styleKeywordsRef;
      return handler;
    }
    if (mode === "deliveryFormats") {
      handler.var = deliveryFormats;
      handler.setter = setDeliveryFormats;
      handler.ref = deliveryFormatsRef;
      return handler;
    }
    if (mode === "websites") {
      handler.var = websites.value;
      handler.setter = setWebsites;
      handler.ref = websitesRef;
      return handler;
    }
  };
  const { var: modeVar, setter: modeSetter, ref: modeRef } = valueMode(mode);

  const tagsList = useForm({
    initialValues: {
      tags: [],
    },
  });

  const handleList = () => {
    if (tagsList.values.tags.length === 10) return;
    if (tagsList.values.tags.includes(inputValue)) {
      notifications.show({
        title: "Already Included...",
        message: '"' + inputValue + '"' + " was already added.",
      });
      setInputValue("");
      return;
    }
    if (inputValue === "") {
      notifications.show({
        title: "Empty Field...",
        message: "Please enter a value.",
      });
      return;
    }
    tagsList.insertListItem("tags", inputValue);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleList();
    }
  };

  useEffect(() => {
    const equal = shallowEqual(modeVar, tagsList.values.tags);
    if (!equal) {
      modeSetter(tagsList.values.tags);
    }
  }, [tagsList.values.tags, modeSetter, modeVar]);

  const tags = tagsList.values.tags.map((tag, index) => (
    <Group justify="space-between" key={index}>
      <Group gap={7}>
        <Text opacity={0.25} fw={700} fz={14}>
          {index + 1}
          {" )"}
        </Text>
        <Text fz={14}>{tag}</Text>
      </Group>
      <ActionIcon
        className={classes.deleteBtn}
        onClick={() => tagsList.removeListItem("tags", index)}
        variant="transparent"
        color="red"
      >
        <FaCut size={12} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Popover
      opened={(focused || hoveringPopover) && tagsList.values.tags.length > 0}
      position="top"
      width={"target"}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Input.Wrapper ref={ref}>
          <Input
            ref={modeRef}
            className="inputWrapper"
            tabIndex={tabIndex}
            value={inputValue}
            onChange={(event) => {
              if (tagsList.values.tags.length < 10) {
                setInputValue(event.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              placeholder +
              (tagsList.values.tags.length === 10 ? " | Max Reached" : "...")
            }
            mah={50}
            leftSectionWidth={50}
            leftSectionPointerEvents="all"
            leftSection={
              <ActionIcon
                className={"actionBtnDimmed"}
                variant="transparent"
                color="#777"
                onClick={() => {
                  if (helpMode !== mode || !deliverInfo) {
                    setHelpMode(mode);
                    setDeliverInfo(true);
                  } else {
                    setDeliverInfo(!deliverInfo);
                    if (deliverInfo) {
                      setTimeout(() => {
                        setHelpMode("");
                      }, 300);
                    }
                  }
                }}
              >
                <TbHelpSquareFilled className={classes.tagsInput} size={30} />
              </ActionIcon>
            }
            rightSectionPointerEvents="all"
            rightSection={
              <ActionIcon
                className={"actionBtn actionBtnDimmed"}
                w={40}
                mr={10}
                onClick={handleList}
              >
                <FaPlus size={12} />
              </ActionIcon>
            }
          />
        </Input.Wrapper>
      </Popover.Target>
      <Popover.Dropdown
        ref={popoverDropdownRef}
        className="selectDropdown"
        onMouseEnter={() => setHoveringPopover(true)}
      >
        <Group justify="space-between" mb={10}>
          <Group gap={7}>
            <Image
              className={classes.tagIcon}
              opacity={0.25}
              src={`/img/clientDashboard/${icon}.svg`}
              alt={icon}
              fit="contain"
              w={30}
            />
            <Stack gap={0}>
              <Text tt={"uppercase"} opacity={0.25} c="dark.9" fw={700} fz={12}>
                {placeholder}
              </Text>
              <Text tt={"uppercase"} c="dark.9" fw={100} fz={12} mr={8} mt={-6}>
                {tags.length === 10 ? "Max Reached" : tags.length + " / 10"}
              </Text>
            </Stack>
          </Group>
          <Group gap={5}>
            <CloseButton
              className={classes.closeBtn}
              variant="transparent"
              onClick={() => setHoveringPopover(false)}
            />
          </Group>
        </Group>
        <Box className={classes.tagsListFrame}>{tags}</Box>
      </Popover.Dropdown>
    </Popover>
  );
}
